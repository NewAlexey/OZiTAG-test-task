import { EWindowSize, TWindowSize } from './constants';

export default function getWindowSize(): TWindowSize {
  const { clientWidth } = document.documentElement;

  if (clientWidth <= 500) {
    return EWindowSize.SMALL;
  }

  if (clientWidth <= 650) {
    return EWindowSize.MEDIUM;
  }

  return EWindowSize.LARGE;
}
