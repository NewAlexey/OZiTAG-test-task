export interface IOptionItem {
  option: HTMLOptionElement;
  isOpen: boolean;
  isChecked: boolean;
  isArrowNeeded: boolean;
  isShown: boolean;
  isBoldNeeded: boolean;
  dataLevel: number;
  dataValue: string;
  childrenIndex: IOptionItem[] | null;
}
