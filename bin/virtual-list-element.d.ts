import { LitElement } from '@polymer/lit-element/lit-element.js';
import { TemplateResult } from 'lit-html/lit-html.js';
import { VirtualizationDelegate } from './virtual-list.js';
export declare class VirtualListElement extends LitElement {
    itemwidth: number;
    buffer: number;
    private vl?;
    private _delegate?;
    static readonly properties: {
        itemwidth: NumberConstructor;
        buffer: NumberConstructor;
    };
    _render(): TemplateResult;
    _didRender(): void;
    delegate: VirtualizationDelegate;
    refresh(): void;
    scrollToIndex(index: number): void;
    readonly container: HTMLElement;
}
