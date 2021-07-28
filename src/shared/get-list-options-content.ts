/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { IOptionItem } from '../interfaces/option-interface';

const MARGIN_PX_OPTION_LIST_ITEM = 15;

function getInputElement(value: string, checkedOptions: Set<string>): string {
  return checkedOptions.has(value)
    ? `<input type="checkbox" id="value-${value}" class="custom-checkbox" checked="checked">`
    : `<input type="checkbox" id="value-${value}" class="custom-checkbox">`;
}

function getOptionListItem(indent: number, element: IOptionItem, checkedOptions: Set<string>): string {
  return `<div class="option-item">
            ${getInputElement(element.option.value, checkedOptions)}
            <label for="value-${element.option.value}" data-value="value-${element.option.value}" class="${
              checkedOptions.has(element.option.value) ? 'background-selected-option' : ''}">
              <span style="margin-left: ${indent}px; left: ${element.isArrowNeeded ? 0 : 25}px" data-value="value-${
              element.option.value}">
                ${
                  element.isArrowNeeded
                    ? `<div class="arrow-up ${element.isOpen ? '' : 'arrow-down'}" data-value="value-${
                        element.option.value
                      }"></div>`
                    : ''
                }
                ${element.option.innerText}
              </span>
            </label>
          </div>`;
}

export default function getOptionsList(array: IOptionItem[], checkedOptions: Set<string>): string {
  let indent = 0;

  const listOptionsContent = array.reduce((acc, element, index, currentArr) => {
    const currentAttributeOfElement = element.option.getAttribute('data-level');

    if (!element.isShown) {
      return acc;
    }

    if (!currentAttributeOfElement) {
      indent = 0;
      acc += getOptionListItem(indent, element, checkedOptions);

      return acc;
    }

    const prevAttributeOfElement = currentArr[index - 1]?.option.getAttribute('data-level');

    if (!prevAttributeOfElement) {
      indent = MARGIN_PX_OPTION_LIST_ITEM;

      acc += getOptionListItem(indent, element, checkedOptions);

      return acc;
    }

    if (prevAttributeOfElement === currentAttributeOfElement) {
      acc += getOptionListItem(indent, element, checkedOptions);

      return acc;
    }

    if (prevAttributeOfElement < currentAttributeOfElement) {
      indent += MARGIN_PX_OPTION_LIST_ITEM;

      acc += getOptionListItem(indent, element, checkedOptions);

      return acc;
    }

    if (prevAttributeOfElement > currentAttributeOfElement) {
      indent -= MARGIN_PX_OPTION_LIST_ITEM;

      acc += getOptionListItem(indent, element, checkedOptions);

      return acc;
    }

    return acc;
  }, '');

  return listOptionsContent;
}
