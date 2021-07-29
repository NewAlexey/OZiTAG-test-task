export interface IOptionItem {
  option: HTMLOptionElement;
  isOpen: boolean;
  isChecked: boolean;
  isArrowNeeded: boolean;
  isShown: boolean;
  dataLevel: number;
  dataValue: string;
  childrenIndex: number[] | null;
}
