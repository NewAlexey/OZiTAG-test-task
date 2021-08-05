/* eslint-disable no-cond-assign */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { IOptionItem } from '../interfaces/option-interface';
import { MARGIN_PX_IF_ARROW_IS_NEEDED, MARGIN_PX_OPTION_LIST_ITEM } from './constants';

function getHeightPxVerticalLine(): number {
  const { clientWidth } = document.documentElement;

  if (clientWidth <= 500) {
    return 100;
  }

  if (clientWidth <= 650) {
    return 60;
  }

  return 45;
}

function getInputElement(value: string, checkedOptionsData: Set<string>): string {
  return checkedOptionsData.has(value)
    ? `<input type="checkbox" id="value-${value}" class="custom-checkbox" checked="checked">`
    : `<input type="checkbox" id="value-${value}" class="custom-checkbox">`;
}

function getRightHeightVerticalLine(element: IOptionItem): number {
  let rightHeightLine = 0;

  element.childrenIndex?.forEach((childrenIndex) => {
    if ((childrenIndex as IOptionItem).isShown) {
      rightHeightLine += getHeightPxVerticalLine();
    }
  });

  return rightHeightLine;
}

function getVerticalLine(element: IOptionItem): string {
  return element.isShown
    ? `<div class="vertical-line" style="height:${getRightHeightVerticalLine(element)}px"></div>`
    : '';
}

function getClassForAdaptive(element: IOptionItem): string {
  switch (element.dataLevel) {
    case 6:
      return 'sixth-level';
    case 5:
      return 'fifth-level';
    case 4:
      return 'fourth-level';
    case 3:
      return 'third-level';
    default:
      return '';
  }
}

const START_BOLD_TEXT = `<b>`;
const END_BOLD_TEXT = '</b>';

function getArrayOfIndexCoincidenceValue(elementText: string, inputValue: string): number[] {
  const arrayIndexes = [];
  let lastIndex = -1;

  while ((lastIndex = elementText.toLocaleLowerCase().indexOf(inputValue, lastIndex + 1)) !== -1) {
    arrayIndexes.push(lastIndex);
  }

  return arrayIndexes;
}

function getBoldedText(elementText: string, inputValue: string): string {
  let arrayOfIndexes = getArrayOfIndexCoincidenceValue(elementText, inputValue);
  let resultString = elementText;

  for (let i = 0; i < arrayOfIndexes.length; i += 1) {
    resultString = `${
      resultString.slice(0, arrayOfIndexes[i]) +
      START_BOLD_TEXT +
      resultString.slice(arrayOfIndexes[i], (arrayOfIndexes[i] as number) + inputValue.length) +
      END_BOLD_TEXT +
      resultString.slice((arrayOfIndexes[i] as number) + inputValue.length)
    }`;

    arrayOfIndexes = getArrayOfIndexCoincidenceValue(resultString, inputValue);
  }

  return resultString;
}

function getOptionListItem(
  indent: number,
  element: IOptionItem,
  checkedOptionsData: Set<string>,
  inputValue = ''
): string {
  return `<div class="option-item ${getClassForAdaptive(element)}${
    checkedOptionsData.has(element.dataValue) ? 'background-selected-option' : ''}">
            ${getInputElement(element.dataValue, checkedOptionsData)}
            <label for="value-${element.dataValue}" data-value="value-${element.dataValue}">
            ${element.isArrowNeeded && element.isOpen
                ? `<div class="option-dot" data-value="value-${element.dataValue}"></div>`
                : ''}
            <span style="margin-left: ${indent}px; 
            left: ${element.isArrowNeeded ? 0 : MARGIN_PX_IF_ARROW_IS_NEEDED}px" 
            data-value="value-${element.dataValue}">
              ${element.isArrowNeeded
                  ? `<div class="arrow-up ${element.isOpen ? '' : 'arrow-down'}" data-value="value-${
                      element.dataValue
                    }"></div>
                    ${getVerticalLine(element)}`
                  : ''}
              ${element.isBoldNeeded ? getBoldedText(element.option.innerText, inputValue) : element.option.innerText}
              </span>
            </label>
          </div>`;
}

export default function getOptionsList(array: IOptionItem[], checkedOptionsData: Set<string>, inputValue = ''): string {
  let indent = 0;

  const listOptionsContent = array.reduce((acc, element, index, currentArr) => {
    const currentAttributeOfElement = element.option.getAttribute('data-level');

    if (!element.isShown) {
      return acc;
    }

    if (!currentAttributeOfElement) {
      indent = 0;
      acc += getOptionListItem(indent, element, checkedOptionsData, inputValue);

      return acc;
    }

    const prevAttributeOfElement = currentArr[index - 1]?.option.getAttribute('data-level');

    if (!prevAttributeOfElement) {
      indent = MARGIN_PX_OPTION_LIST_ITEM;

      acc += getOptionListItem(indent, element, checkedOptionsData, inputValue);

      return acc;
    }

    if (prevAttributeOfElement === currentAttributeOfElement) {
      acc += getOptionListItem(indent, element, checkedOptionsData, inputValue);

      return acc;
    }

    if (prevAttributeOfElement < currentAttributeOfElement) {
      indent += MARGIN_PX_OPTION_LIST_ITEM;

      acc += getOptionListItem(indent, element, checkedOptionsData, inputValue);

      return acc;
    }

    if (prevAttributeOfElement > currentAttributeOfElement) {
      indent -= MARGIN_PX_OPTION_LIST_ITEM;

      acc += getOptionListItem(indent, element, checkedOptionsData, inputValue);

      return acc;
    }

    return acc;
  }, '');

  return listOptionsContent;
}
