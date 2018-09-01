function debounce(func, wait, immediate, context) {
    let timeout = 0;
    return () => {
        const args = arguments;
        const later = () => {
            timeout = 0;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}
export class VirtualList {
    constructor(container, scrollElement) {
        this.itemwidth = 100;
        this.buffer = 4;
        this.resizeDebounceInterval = 250;
        this.count = 0;
        this.cells = [];
        this.scrollHandler = () => this.position();
        this.container = container;
        this.scrollElement = scrollElement;
    }
    set delegate(value) {
        this._delegate = value;
        this.refresh();
    }
    get scroller() {
        return this.scrollElement || this.container.parentElement || document.body;
    }
    clear() {
        while (this.container.hasChildNodes() && this.container.lastChild) {
            this.container.removeChild(this.container.lastChild);
        }
        this.cells = [];
        this.scroller.removeEventListener('scroll', this.scrollHandler);
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }
    }
    refresh() {
        this.clear();
        this.count = this._delegate ? this._delegate.length : 0;
        const totalWidth = this.count * this.itemwidth;
        this.container.style.minWidth = `${totalWidth}px`;
        this.position();
        this.scroller.addEventListener('scroll', this.scrollHandler);
        this.resizeHandler = debounce(this.position.bind(this), this.resizeDebounceInterval, false, this);
        window.addEventListener('resize', this.resizeHandler);
    }
    position() {
        if (!this.delegate) {
            return;
        }
        const ranges = this.computeRanges();
        const renderRange = ranges[1];
        const doNotTouchCells = new Map();
        const spareCells = this.cells.filter((c) => {
            if (c.index < renderRange[0] || c.index > renderRange[1]) {
                return true;
            }
            doNotTouchCells.set(c.index, c);
            return false;
        });
        const indicesToRender = [];
        for (let i = renderRange[0]; i <= renderRange[1]; i++) {
            if (!doNotTouchCells.has(i)) {
                indicesToRender.push(i);
            }
        }
        while (indicesToRender.length && spareCells.length) {
            const i = indicesToRender.shift();
            const cell = spareCells.shift();
            cell.index = i;
            this.delegate.updateElement(cell.node, i);
            this.positionCell(cell.node, i);
            doNotTouchCells.set(i, cell);
        }
        while (spareCells.length) {
            const cell = spareCells.shift();
            this.container.removeChild(cell.node);
        }
        while (indicesToRender.length) {
            const i = indicesToRender.shift();
            const node = this.delegate.createElement();
            node.style.position = 'aboslute';
            this.container.appendChild(node);
            this.delegate.updateElement(node, i);
            this.positionCell(node, i);
            doNotTouchCells.set(i, { index: i, node });
        }
        this.cells = Array.from(doNotTouchCells.values());
    }
    positionCell(cell, index) {
        cell.style.transform = `translate(${Math.round(index * this.itemwidth)}px, 0)`;
    }
    computeRanges() {
        const min = Math.max(0, Math.min(this.count - 1, Math.floor((this.scroller.scrollLeft / (this.scroller.scrollWidth || 1)) * this.itemwidth)));
        const max = Math.max(0, Math.min(this.count - 1, Math.floor(((this.scroller.scrollLeft + this.scroller.getBoundingClientRect().width) / (this.scroller.scrollWidth || 1)) * this.itemwidth)));
        const pre = Math.max(0, min - Math.floor(this.buffer / 2));
        const post = Math.min(this.count - 1, max + this.buffer - (min - pre));
        return [[min, max], [pre, post]];
    }
}
