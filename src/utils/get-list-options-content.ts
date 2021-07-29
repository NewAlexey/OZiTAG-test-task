/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { IOptionItem } from '../interfaces/option-interface';

const MARGIN_PX_OPTION_LIST_ITEM = 15;
const MARGIN_PX_IF_ARROW_IS_NEEDED = 25;
const HEIGHT_PX_VERTICAL_LINE = 45;

function getInputElement(value: string, checkedOptions: Set<string>): string {
  return checkedOptions.has(value)
    ? `<input type="checkbox" id="value-${value}" class="custom-checkbox" checked="checked">`
    : `<input type="checkbox" id="value-${value}" class="custom-checkbox">`;
}

function getRightHeightVerticalLine(element: IOptionItem, array: IOptionItem[]): number {
  let rightHeightLine = 0;

  element.childrenIndex?.forEach((childrenIndex) => {
    if (array[childrenIndex]?.isShown) {
      rightHeightLine += HEIGHT_PX_VERTICAL_LINE;
    }
  });

  return rightHeightLine;
}

function getVerticalLine(element: IOptionItem, array: IOptionItem[]): string {
  return element.isShown
    ? `<div class="vertical-line" style="height:${getRightHeightVerticalLine(element, array)}px"></div>`
    : '';
}

function getOptionListItem(
  indent: number,
  element: IOptionItem,
  checkedOptions: Set<string>,
  array: IOptionItem[]
): string {
  return `<div class="option-item">
            ${getInputElement(element.dataValue, checkedOptions)}
            <label for="value-${element.dataValue}" data-value="value-${element.dataValue}" class="${
            checkedOptions.has(element.dataValue) ? 'background-selected-option' : ''}">
            ${element.isArrowNeeded && element.isOpen && !element.isChecked ? '<div class="option-dot"></div>' : ''}
              <span style="margin-left: ${indent}px; left: ${
              element.isArrowNeeded ? 0 : MARGIN_PX_IF_ARROW_IS_NEEDED}px" 
              data-value="value-${element.dataValue}">
                ${element.isArrowNeeded
                    ? `<div class="arrow-up ${element.isOpen ? '' : 'arrow-down'}" data-value="value-${
                        element.dataValue
                      }"></div>
                      ${getVerticalLine(element, array)}`
                    : ''}
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
      acc += getOptionListItem(indent, element, checkedOptions, currentArr);

      return acc;
    }

    const prevAttributeOfElement = currentArr[index - 1]?.option.getAttribute('data-level');

    if (!prevAttributeOfElement) {
      indent = MARGIN_PX_OPTION_LIST_ITEM;

      acc += getOptionListItem(indent, element, checkedOptions, currentArr);

      return acc;
    }

    if (prevAttributeOfElement === currentAttributeOfElement) {
      acc += getOptionListItem(indent, element, checkedOptions, currentArr);

      return acc;
    }

    if (prevAttributeOfElement < currentAttributeOfElement) {
      indent += MARGIN_PX_OPTION_LIST_ITEM;

      acc += getOptionListItem(indent, element, checkedOptions, currentArr);

      return acc;
    }

    if (prevAttributeOfElement > currentAttributeOfElement) {
      indent -= MARGIN_PX_OPTION_LIST_ITEM;

      acc += getOptionListItem(indent, element, checkedOptions, currentArr);

      return acc;
    }

    return acc;
  }, '');

  return listOptionsContent;
}
