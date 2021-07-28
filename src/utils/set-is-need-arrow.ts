import { IOptionItem } from '../interfaces/option-interface';

export default function setIsNeedArrowForOpen(array: IOptionItem[]): IOptionItem[] {
  return array.map((element, index) => {
    const nextAttributeOfElement = array[index + 1]?.option.getAttribute('data-level');

    if (!nextAttributeOfElement) {
      return element;
    }

    if (nextAttributeOfElement) {
      const currentAttributeOfElement = array[index]?.option.getAttribute('data-level');

      if (
        !currentAttributeOfElement ||
        (+currentAttributeOfElement !== +nextAttributeOfElement && +currentAttributeOfElement < +nextAttributeOfElement)
      ) {
        const updatedElement = element;
        updatedElement.isArrowNeeded = true;

        return updatedElement;
      }
    }

    return element;
  });
}
