import { LitElement, html } from '@polymer/lit-element/lit-element.js';

export class DemoCard extends LitElement {
  static get properties() {
    return {
      index: Number
    };
  }

  constructor() {
    super();
    this.index = 0;
  }

  _render({ index }) {
    return html`
    <style>
      :host {
        display: block;
        margin: 0 10px;
        background: #f5f5f5;
        padding: 10px;
        width: 75px;
        font-size: 11px;
        border-radius: 5px;
        border: 1px solid #e5e5e5;
      }
      p {
        margin: 0;
      }
      h2 {
        margin: 0;
        font-weight: bold;
        color: darkblue;
        margin-bottom: 5px;
        font-size: 14px;
      }
    </style>
    <h2>N: ${index}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    `
  }
}

customElements.define('demo-card', DemoCard);