import { IOptionItem } from '../interfaces/option-interface';

export default function setChildrenToItems(listItem: IOptionItem[]): IOptionItem[] {
  for (let i = 1; i < listItem.length; i += 1) {
    let j = i;

    while ((listItem[i]?.dataLevel as number) < (listItem[j + 1]?.dataLevel as number)) {
      ((listItem[i] as IOptionItem).childrenIndex as IOptionItem[]).push(listItem[j + 1] as IOptionItem);
      j += 1;
    }
  }

  return listItem;
}
