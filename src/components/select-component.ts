/* eslint-disable no-param-reassign */
import { IOptionItem } from '../interfaces/option-interface';
import getOptionsList from '../utils/get-list-options-content';
import getNextValueForOptionData from '../utils/get-next-value-for-option-data';
import getRandomBoolean from '../utils/get-random-boolean';
import setChildrenToItems from '../utils/set-children-to-items';
import setIsNeedArrowForOpen from '../utils/set-is-need-arrow';
import setIsCheckedToItem from '../utils/set-item-is-checked';
import BaseComponent from './base-component';

export default class SelectComponent extends BaseComponent {
  public isShownOptions: boolean;

  public checkedOptions: Set<string>;

  public allOptionsItems: IOptionItem[];

  public constructor() {
    super('div', ['select-container']);
    this.checkedOptions = new Set();
    this.element.innerHTML = `
    <select multiple size="1">
      <option selected value="">Код ОКРБ или наименование закупаемой продукции</option>
      <option value="10">[A] - Продукция сельского хозяйства, лесного хозяйства рыбоводства и рыболовства</option>
      <option value="11">
        [О] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по
        обязательному социальному страхованию
      </option>
      <option value="12" data-level="2">
        [84] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по
        обязательному социальному страхованию
      </option>
      <option value="13" data-level="3" ${getRandomBoolean() ? 'selected' : ''}>
      [84.1] - Услуги в области государственного управления общего характера и социально-экономической сфере
      </option>
      <option value="14" data-level="4">
        [84.11] - Услуги в области государственного управления общего характера
      </option>
      <option value="15" data-level="5">
        [84.11.11] - Услуги в области исполнительной и законодательной деятельности
      </option>
      <option value="16" data-level="6" ${getRandomBoolean() ? 'selected' : ''}>
        [84.11.11.100] - Услуги центральных органов исполнительной и законодательной власти
      </option>
      <option value="17" data-level="6" >
        [84.11.11.200] - Услуги органов управления и самоуправления областного территориального уровня
      </option>
      <option value="18" data-level="6">
        [84.11.11.300] - Услуги органов управления и самоуправления базового территориального уровня
      </option>
      <option value="19" data-level="5" ${getRandomBoolean() ? 'selected' : ''}>
        [84.11.11] - Услуги в области исполнительной и законодательной деятельности
      </option>
      <option value="20">[A] - Продукция сельского хозяйства, лесного хозяйства рыбоводства и рыболовства</option>
      <option value="21">
        [О] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по
        обязательному социальному страхованию
      </option>
      <option value="22" data-level="2">
        [84] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по
        обязательному социальному страхованию
      </option>
      <option value="23" data-level="3">
        [84.1] - Услуги в области государственного управления общего характера и социально-экономической сфере
      </option>
      <option value="24" data-level="4">
        [84.11] - Услуги в области государственного управления общего характера
      </option>
      <option value="25" data-level="5" ${getRandomBoolean() ? 'selected' : ''}>
        [84.11.11] - Услуги в области исполнительной и законодательной деятельности
      </option>
      <option value="26" data-level="6">
        [84.11.11.100] - Услуги центральных органов исполнительной и законодательной власти
      </option>
      <option value="27" data-level="6">
        [84.11.11.200] - Услуги органов управления и самоуправления областного территориального уровня
      </option>
      <option value="28" data-level="6" ${getRandomBoolean() ? 'selected' : ''}>
        [84.11.11.300] - Услуги органов управления и самоуправления базового территориального уровня
      </option>
    </select>
    `;
    this.isShownOptions = false;
    this.allOptionsItems = this.getAllOptionsItem();
    this.setCheckedOptions();
  }

  private setCheckedOptions(): void {
    const optionsList = [...this.element.querySelectorAll('option')];
    optionsList.shift();
    optionsList.forEach((option, index) => {
      if (option.getAttribute('selected') !== null) {
        this.checkedOptions.add(String(this.allOptionsItems[index]?.dataValue));
        option.removeAttribute('selected');
      }
    });
  }

  public getAllOptionsItem(): IOptionItem[] {
    const optionsList = [...this.element.querySelectorAll('option')].map((option) => {
      const newElement = {} as IOptionItem;

      newElement.option = option;
      newElement.isArrowNeeded = false;
      newElement.isOpen = true;
      newElement.isChecked = false;
      newElement.isShown = true;
      newElement.dataLevel = +(option.getAttribute('data-level') as string);
      newElement.dataValue = `${+option.value}${getNextValueForOptionData()}`;
      newElement.childrenIndex = [];

      return newElement;
    });
    optionsList.shift();

    const updateListItemForArrows = setIsNeedArrowForOpen(optionsList);
    const updateListItemWithChildren = setChildrenToItems(updateListItemForArrows);
    const updateListItemForIsChecked = setIsCheckedToItem(updateListItemWithChildren, this.checkedOptions);

    return updateListItemForIsChecked;
  }

  public getAllOptionsAsString(): void | string {
    if (!this.isShownOptions) {
      this.isShownOptions = true;
      const listOptionsContent = getOptionsList(this.allOptionsItems, this.checkedOptions);

      return listOptionsContent;
    }

    this.isShownOptions = false;

    return undefined;
  }

  public isOptionInCheckedList(value: string): boolean {
    return this.checkedOptions.has(value);
  }

  public addCheckedOption(value: string): void {
    this.checkedOptions.add(value);
  }

  public removeCheckedOption(value: string): void {
    this.checkedOptions.delete(value);
  }
}
