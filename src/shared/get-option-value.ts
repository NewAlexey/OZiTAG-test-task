const DATA_VALUE_INDEX = 1;

export default function getOptionValue(option: HTMLLabelElement): string {
  return (option.getAttribute('data-value') as string).split('-')[DATA_VALUE_INDEX] as string;
}
