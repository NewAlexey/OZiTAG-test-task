export default function createHTMLElement(element: string, content: string, cls: string): HTMLElement {
  const elem = document.createElement(element);

  if (content) {
    elem.innerText = content;
  }

  if (cls) {
    elem.classList.add(cls);
  }

  return elem;
}
