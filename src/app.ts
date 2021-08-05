/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
import ButtonsComponent from './components/buttons-component';
import HeaderComponent from './components/header-component';
import InputComponent from './components/input-component';
import OptionsListComponent from './components/options-list-component';
import { IOptionItem } from './interfaces/option-interface';
import { MIN_BOLD_VALUE_LENGTH, TWindowSize } from './utils/constants';
import createHTMLElement from './utils/create-HTML-element';
import getOptionsList from './utils/get-list-options-content';
import getOptionValue from './utils/get-option-value';
import getWindowSize from './utils/get-window-size';

export default class App {
  private headerListComponent: HeaderComponent;

  private optionsListComponent: OptionsListComponent;

  private inputComponent: InputComponent;

  private buttonsComponent: ButtonsComponent;

  private contentContainer: HTMLElement;

  private windowSize: TWindowSize;

  private optionsListContainer: HTMLElement | null;

  private bindedFunctionHandleClickApplyButton = this.handleClickApplyButton.bind(this);

  private funcHandleClickClearButton = this.clearHeaderAndSetItemsIsntCheked.bind(this);

  public constructor(private readonly rootElement: HTMLElement) {
    this.contentContainer = document.createElement('div');
    this.contentContainer.classList.add('list-component');

    this.headerListComponent = new HeaderComponent();
    this.optionsListComponent = new OptionsListComponent();
    this.inputComponent = new InputComponent();
    this.buttonsComponent = new ButtonsComponent();

    this.rootElement.append(this.contentContainer);
    this.contentContainer.append(this.headerListComponent.element);
    this.contentContainer.append(this.inputComponent.element);
    this.optionsListContainer = null;
    this.setCheckedOption();
    this.setVisibleIfIsCheckedElements();
    this.windowSize = getWindowSize();
    this.addListenersToElements();
  }

  private setCheckedOption(): void {
    this.headerListComponent.countCheckedOptions = this.optionsListComponent.checkedOptionsData.size;
    this.headerListComponent.setNewValueInCountElement();
    this.headerListComponent.hideInformationIfSelectedEmpty();
  }

  private setVisibleIfIsCheckedElements(): void {
    const { inputElement } = this.inputComponent;
    const inputContainer = this.inputComponent.element;
    const checkedElement = this.optionsListComponent.allOptionsItems.find((element) => element.isChecked);

    if (checkedElement) {
      this.inputComponent.setPlaceholderAndClass(checkedElement);
    } else {
      this.inputComponent.setDefaultPlaceholderAndRemoveClass();
    }

    if (!inputElement.value && checkedElement) {
      inputContainer.classList.add('input-container-selected-option');
    } else {
      inputContainer.classList.remove('input-container-selected-option');
    }
  }

  private addListenersToElements(): void {
    (this.inputComponent.element.querySelector('input') as HTMLInputElement).addEventListener(
      'click',
      this.getOptionsList.bind(this)
    );
    (this.inputComponent.element.querySelector('input') as HTMLInputElement).addEventListener(
      'input',
      this.showOptionListAccordingToSearchResult.bind(this)
    );
    (this.headerListComponent.element.querySelector('.selected-elements') as HTMLSelectElement).addEventListener(
      'click',
      this.setAllOptionIsShowAndShowOnScreen.bind(this)
    );

    window.addEventListener('resize', this.handleResizeScreen.bind(this));
  }

  private setAllOptionIsShowAndShowOnScreen(): void {
    const allOptionsInShownMode = this.optionsListComponent.allOptionsItems.map((option) => {
      const updatedOptionElem = option;
      updatedOptionElem.isShown = true;
      updatedOptionElem.isOpen = true;

      return updatedOptionElem;
    });

    this.optionsListComponent.allOptionsItems = [...allOptionsInShownMode];

    this.getOptionsList();
  }

  private getOptionsList(): void {
    const optionsList = this.optionsListComponent.getAllOptionsAsString();

    if (optionsList) {
      this.showOptionsListOnScreen(optionsList as string);
    }
  }

  private showOptionsListOnScreen(optionsListAsString: string): void {
    this.optionsListContainer = createHTMLElement('div', '', 'options-list-information-container') as HTMLElement;
    this.contentContainer.append(this.optionsListContainer);
    this.optionsListContainer.addEventListener('click', this.handleClickOptionsListContainer.bind(this));
    this.optionsListContainer.innerHTML = optionsListAsString;
    this.contentContainer.append(this.buttonsComponent.element);
    this.addListenersToButtons();
  }

  private removeOptionListFromScreen(): void {
    this.optionsListContainer?.removeEventListener('click', this.handleClickOptionsListContainer.bind(this));
    this.optionsListContainer?.remove();
    this.removeListenersToButtons();
    this.buttonsComponent.element.remove();
  }

  private addListenersToButtons(): void {
    this.buttonsComponent.element
      .querySelector('.button-apply')
      ?.addEventListener('click', this.bindedFunctionHandleClickApplyButton);
    this.buttonsComponent.element
      .querySelector('.button-clear')
      ?.addEventListener('click', this.funcHandleClickClearButton);
  }

  private removeListenersToButtons(): void {
    this.buttonsComponent.element
      .querySelector('.button-apply')
      ?.removeEventListener('click', this.bindedFunctionHandleClickApplyButton);
    this.buttonsComponent.element
      .querySelector('.button-clear')
      ?.removeEventListener('click', this.funcHandleClickClearButton);
  }

  private handleClickApplyButton(): void {
    const checkedElements = [...this.optionsListComponent.checkedOptionsData].join(', ');

    if (!checkedElements) {
      alert('Ничего не выбрано');
    } else {
      alert(`Выбраны следующие элементы - ${checkedElements}`);
      this.clearHeaderAndSetItemsIsntCheked();
      this.showAndClearAllOptionsList();
    }
  }

  private showAndClearAllOptionsList(): void {
    const optionsList = this.optionsListComponent.allOptionsItems;
    optionsList.forEach((element) => {
      element.isShown = true;
      element.isBoldNeeded = false;
      element.isChecked = false;
      element.isOpen = true;
    });
    this.removeOptionListFromScreen();
    const allList = getOptionsList(optionsList, this.optionsListComponent.checkedOptionsData);
    this.showOptionsListOnScreen(allList);
  }

  private clearCheckedOptions(): void {
    const inputsList = [...this.contentContainer.querySelectorAll('input')];
    inputsList.forEach((input) => {
      input.checked = false;
      input.removeAttribute('checked');
    });

    const labelsList = [...this.contentContainer.querySelectorAll('.option-item ')];
    labelsList.forEach((div) => {
      div.classList.remove('background-selected-option');
    });

    this.inputComponent.setDefaultPlaceholderAndRemoveClass();
    this.optionsListComponent.setOptionToIsntChecked();
  }

  private clearCheckedOptionsFromHeaderComponent(): void {
    this.optionsListComponent.checkedOptionsData.clear();
    this.headerListComponent.countCheckedOptions = 0;
    this.headerListComponent.setNewValueInCountElement();
  }

  private clearBoldAndIsShownFieldsInOptionsList(): IOptionItem[] {
    const optionsList = this.optionsListComponent.allOptionsItems;
    optionsList.forEach((element) => {
      element.isShown = true;
      element.isBoldNeeded = false;
    });

    return optionsList;
  }

  private showOptionListAccordingToSearchResult(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const optionsList = this.clearBoldAndIsShownFieldsInOptionsList();

    if (!inputValue) {
      this.removeOptionListFromScreen();
      const allList = getOptionsList(optionsList, this.optionsListComponent.checkedOptionsData);
      this.showOptionsListOnScreen(allList);
    } else {
      optionsList.forEach((element) => {
        const elementText = element.option.innerText.toLowerCase();

        if (!elementText.includes(inputValue)) {
          element.isShown = false;
        }

        if (inputValue.length >= MIN_BOLD_VALUE_LENGTH && elementText.includes(inputValue)) {
          element.isBoldNeeded = true;
        }
      });
      const findedCoincidence = optionsList.filter((element) => element.isShown);
      const findedOptionList = getOptionsList(
        findedCoincidence,
        this.optionsListComponent.checkedOptionsData,
        inputValue
      );
      this.removeOptionListFromScreen();
      this.showOptionsListOnScreen(findedOptionList);
    }
  }

  private clearHeaderAndSetItemsIsntCheked(): void {
    this.inputComponent.clearInputValueAndPlaceholder();
    this.clearCheckedOptions();
    this.clearCheckedOptionsFromHeaderComponent();
  }

  private handleClickOptionsListContainer(event: MouseEvent): void {
    const clickTarget = event.target as HTMLLabelElement;

    if (clickTarget.localName === 'span') {
      event.preventDefault();

      return;
    }

    if (clickTarget.classList.contains('arrow-up')) {
      const optionValue = getOptionValue(clickTarget);

      if (clickTarget.classList.contains('arrow-down')) {
        this.setShownOptionsList(optionValue, true);
        event.preventDefault();

        return;
      }

      this.setShownOptionsList(optionValue, false);
      event.preventDefault();

      return;
    }

    if (clickTarget.localName === 'label') {
      (clickTarget.parentElement as HTMLDivElement).classList.toggle('background-selected-option');
      this.checkedOptionListItem(clickTarget);
      this.setVisibleIfIsCheckedElements();
    }
  }

  private setShownOptionsList(optionValue: string, isOpen: boolean): void {
    const optionsList = [...this.optionsListComponent.allOptionsItems];
    const updatedOptionsList = optionsList.map((element) => {
      if (element.dataValue === optionValue) {
        const updatedElem = element;
        updatedElem.isOpen = isOpen;

        return element;
      }

      return element;
    });

    const clickedOptionItem = updatedOptionsList.find((element) => element.dataValue === optionValue) as IOptionItem;

    this.optionsListComponent.setChildrenIsOptionsList(clickedOptionItem, optionsList, isOpen);
    this.optionsListComponent.isShownOptions = false;
    this.optionsListContainer?.remove();
    this.getOptionsList();
  }

  private checkedOptionListItem(clickTarget: HTMLLabelElement): void {
    const optionValue = getOptionValue(clickTarget);

    this.optionsListComponent.allOptionsItems = this.optionsListComponent.allOptionsItems.map((element) => {
      if (optionValue === element.dataValue) {
        element.isChecked = !element.isChecked;
      }

      return element;
    });

    if (this.optionsListComponent.isOptionInCheckedList(optionValue)) {
      this.optionsListComponent.removeCheckedOption(optionValue);
      this.headerListComponent.countCheckedOptions -= 1;
    } else {
      this.optionsListComponent.addCheckedOption(optionValue);
      this.headerListComponent.countCheckedOptions += 1;
    }

    this.headerListComponent.setNewValueInCountElement();
  }

  private handleResizeScreen(): void {
    const windowSize = getWindowSize();

    if (windowSize !== this.windowSize) {
      this.windowSize = windowSize;

      if (this.optionsListComponent.isShownOptions) {
        this.removeOptionListFromScreen();
        const optionsList = getOptionsList(
          this.optionsListComponent.allOptionsItems,
          this.optionsListComponent.checkedOptionsData
        );
        this.showOptionsListOnScreen(optionsList);
      }
    }
  }
}
