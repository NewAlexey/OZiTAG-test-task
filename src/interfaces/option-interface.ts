export interface IOptionItem {
  option: HTMLOptionElement;
  isOpen: boolean;
  isArrowNeeded: boolean;
  isShown: boolean;
  dataLevel: number;
  dataValue: number;
  childrenIndex: number[] | null;
}
