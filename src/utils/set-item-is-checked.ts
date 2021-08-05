import { IOptionItem } from '../interfaces/option-interface';

export default function setIsCheckedToItem(
  listItem: IOptionItem[],
  checkedOptionsDataList: Set<string>
): IOptionItem[] {
  return listItem.map((element) => {
    if (checkedOptionsDataList.has(element.dataValue)) {
      const updatedElement = element;
      updatedElement.isChecked = true;

      return updatedElement;
    }

    return element;
  });
}
