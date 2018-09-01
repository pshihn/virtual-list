export interface VirtualizationDelegate {
    createElement(): HTMLElement;
    updateElement(child: HTMLElement, index: number): void;
    length: number;
}
export declare class VirtualList {
    itemwidth: number;
    buffer: number;
    resizeDebounceInterval: number;
    private count;
    private scrollElement?;
    private container;
    private cells;
    private _delegate?;
    private scrollHandler;
    private resizeHandler?;
    private currentRenderRange;
    constructor(container: HTMLElement, scrollElement?: HTMLElement);
    delegate: VirtualizationDelegate;
    private readonly scroller;
    clear(): void;
    private refresh;
    position(): void;
    private positionCell;
    private computeRanges;
}
