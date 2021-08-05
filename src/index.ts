import App from './app';
import ButtonAddNewSelectComponent from './components/button-add-new-select-component';
import './style.scss';

function addNewComponent(): void {
  const appContainer = document.querySelector('.container') as HTMLElement;
  const selectComponent = document.createElement('div');
  selectComponent.classList.add('select-component');
  appContainer.append(selectComponent);
  new App(selectComponent);
}

window.onload = (): void => {
  const appContainer = document.querySelector('.select-component') as HTMLElement;

  if (!appContainer) throw Error('App root element not found');

  new App(appContainer);
  const addButton = new ButtonAddNewSelectComponent(appContainer);
  addButton.element.addEventListener('click', addNewComponent);
};
