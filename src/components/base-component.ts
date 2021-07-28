export default class BaseComponent {
  public element: HTMLElement;

  public constructor(tag: keyof HTMLElementTagNameMap = 'div', classList: string[] = []) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classList);
  }
}
