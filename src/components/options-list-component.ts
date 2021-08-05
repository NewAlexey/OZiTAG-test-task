/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { IOptionItem } from '../interfaces/option-interface';
import getOptionsList from '../utils/get-list-options-content';
import getNextValueForOptionData from '../utils/get-next-value-for-option-data';
import setChildrenToItems from '../utils/set-children-to-items';
import setIsNeedArrowForOpen from '../utils/set-is-need-arrow';
import setIsCheckedToItem from '../utils/set-item-is-checked';

export default class OptionsListComponent {
  public isShownOptions: boolean;

  public checkedOptionsData: Set<string>;

  public allOptionsItems: IOptionItem[];

  public constructor() {
    this.checkedOptionsData = new Set();
    this.isShownOptions = false;
    this.allOptionsItems = this.getAllOptionsItem();
  }

  public getAllOptionsItem(): IOptionItem[] {
    const optionsList = [...(document.getElementById('select-1') as HTMLSelectElement).querySelectorAll('option')].map(
      (option) => {
        const newElement = {} as IOptionItem;

        newElement.option = option;
        newElement.isArrowNeeded = false;
        newElement.isOpen = true;
        newElement.isChecked = false;
        newElement.isBoldNeeded = false;
        newElement.isShown = true;
        newElement.dataLevel = +(option.getAttribute('data-level') as string);
        newElement.dataValue = `${option.value}${getNextValueForOptionData()}`;
        newElement.childrenIndex = [];

        if (option.getAttribute('selected') !== null) {
          this.checkedOptionsData.add(newElement.dataValue);
          option.removeAttribute('selected');
          newElement.isChecked = true;
        }

        return newElement;
      }
    );

    const updateListItemForArrows = setIsNeedArrowForOpen(optionsList);
    const updateListItemWithChildren = setChildrenToItems(updateListItemForArrows);
    const updateListItemForIsChecked = setIsCheckedToItem(updateListItemWithChildren, this.checkedOptionsData);

    return updateListItemForIsChecked;
  }

  public setOptionToIsntChecked(): void {
    this.allOptionsItems.forEach((element) => {
      element.isChecked = false;
    });
  }

  public setChildrenIsOptionsList(optionItem: IOptionItem, optionsList: IOptionItem[], value: boolean): void {
    const updatedOptionsList = optionsList.map((elem) => {
      optionItem.childrenIndex?.forEach((childrenIndex) => {
        if (childrenIndex.dataValue === elem.dataValue) {
          elem.isShown = value;
          elem.isOpen = value;
        }
      });

      return elem;
    });

    this.allOptionsItems = [...updatedOptionsList];
  }

  public getAllOptionsAsString(value = this.allOptionsItems): void | string {
    if (!this.isShownOptions) {
      this.isShownOptions = true;
      const listOptionsContent = getOptionsList(value, this.checkedOptionsData);

      return listOptionsContent;
    }

    return undefined;
  }

  public isOptionInCheckedList(value: string): boolean {
    return this.checkedOptionsData.has(value);
  }

  public addCheckedOption(value: string): void {
    this.checkedOptionsData.add(value);
  }

  public removeCheckedOption(value: string): void {
    this.checkedOptionsData.delete(value);
  }
}
