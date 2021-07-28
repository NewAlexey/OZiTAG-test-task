import { IOptionItem } from '../interfaces/option-interface';

export default function setChildrenToItems(listItem: IOptionItem[]): IOptionItem[] {
  for (let i = 1; i < listItem.length; i += 1) {
    let j = i;

    while ((listItem[i]?.dataLevel as number) < (listItem[j + 1]?.dataLevel as number)) {
      listItem[i]?.childrenIndex?.push(j + 1);
      j += 1;
    }
  }

  return listItem;
}
