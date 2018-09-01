import { LitElement, html } from '@polymer/lit-element/lit-element.js';
import { VirtualList } from './virtual-list.js';
export class VirtualListElement extends LitElement {
    constructor() {
        super(...arguments);
        this.itemwidth = 100;
        this.buffer = 2;
    }
    static get properties() {
        return {
            itemwidth: Number,
            buffer: Number
        };
    }
    _render() {
        return html `
    <style>
      :host {
        display: block;
        overflow: auto;
        box-sizing: border-box;
        width: 100%;
        height: 100px;
      }
      #container {
        position: relative;
        height: 100%;
        box-sizing: border-box;
      }
    </style>
    <div id="container"></div>
    `;
    }
    _didRender() {
        if (!this.vl) {
            this.vl = new VirtualList(this.shadowRoot.querySelector('#container'), this);
        }
        this.vl.itemwidth = this.itemwidth;
        this.vl.buffer = this.buffer;
        if (this._delegate) {
            this.vl.delegate = this._delegate;
        }
    }
    set delegate(value) {
        this._delegate = value;
        if (this.vl) {
            this.vl.delegate = value;
        }
    }
    refresh() {
        if (this.vl) {
            this.vl.position();
        }
    }
}
customElements.define('virtual-list', VirtualListElement);
