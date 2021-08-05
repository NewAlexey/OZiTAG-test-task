import { IOptionItem } from '../interfaces/option-interface';
import { DEFAULT_PLACEHOLDER } from '../utils/constants';
import BaseComponent from './base-component';

export default class InputComponent extends BaseComponent {
  public inputElement: HTMLInputElement;

  public constructor() {
    super('div', ['input-container']);
    this.element.innerHTML = `
    <input class="input-search" type="text" placeholder="Код ОКРБ или наименование закупаемой продукции">
    `;
    this.inputElement = this.element.querySelector('input') as HTMLInputElement;
  }

  public setPlaceholderAndClass(option: IOptionItem): void {
    this.inputElement.placeholder = option.option.text;
    this.inputElement.classList.add('placeholder-not-empty');
  }

  public setDefaultPlaceholderAndRemoveClass(): void {
    this.inputElement.placeholder = DEFAULT_PLACEHOLDER;
    this.inputElement.classList.remove('placeholder-not-empty');
  }

  public clearInputValueAndPlaceholder(): void {
    this.setDefaultPlaceholderAndRemoveClass();
    this.inputElement.value = '';
  }
}
