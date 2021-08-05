import BaseComponent from './base-component';

export default class HeaderComponent extends BaseComponent {
  public countCheckedOptions: number;

  private spanCounter: HTMLElement;

  public constructor() {
    super('div', ['list-header']);
    this.countCheckedOptions = 0;
    this.element.innerHTML = `
    <p> Тендеры в роли поставщика </p>
    <p class="selected-elements visually-hidden"> Показать выбранное 
      (<span>${this.countCheckedOptions}</span>)
    </p>
    `;
    this.hideInformationIfSelectedEmpty();
    this.spanCounter = this.element.querySelector('span') as HTMLSpanElement;
  }

  public setNewValueInCountElement(): void {
    const spanElement = this.spanCounter;
    spanElement.innerText = `${this.countCheckedOptions}`;
    this.hideInformationIfSelectedEmpty();
  }

  public hideInformationIfSelectedEmpty(): void {
    const countElement = this.element.querySelector('.selected-elements') as HTMLSpanElement;

    if (this.countCheckedOptions === 0) {
      countElement.classList.add('visually-hidden');
    } else {
      countElement.classList.remove('visually-hidden');
    }
  }
}
