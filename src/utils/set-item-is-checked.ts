import { IOptionItem } from '../interfaces/option-interface';

export default function setIsCheckedToItem(listItem: IOptionItem[], checkedOptionsList: Set<string>): IOptionItem[] {
  return listItem.map((element) => {
    if (checkedOptionsList.has(element.dataValue)) {
      const updatedElement = element;
      updatedElement.isChecked = true;

      return updatedElement;
    }

    return element;
  });
}
