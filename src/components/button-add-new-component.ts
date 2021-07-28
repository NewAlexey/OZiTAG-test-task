/* eslint-disable no-console */
import BaseComponent from '../utils/base-component';

export default class ButtonAddNewSelectComponent extends BaseComponent {
  public constructor(private readonly rootElement: HTMLElement) {
    super('div', ['button-add-new-select']);
    this.element.innerText = 'Добавить новый компонент';
    this.rootElement.append(this.element);
  }
}
