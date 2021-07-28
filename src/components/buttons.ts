/* eslint-disable no-console */
import BaseComponent from '../utils/base-component';

export default class ButtonsComponent extends BaseComponent {
  public constructor() {
    super('div', ['buttons-container']);
    this.element.innerHTML = `
    <div class="button-apply"> применить </div>
    <div class="button-clear"> очистить </div>
    `;
  }
}
