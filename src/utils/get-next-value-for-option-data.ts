function closureValue(): () => number {
  let value = 0;

  return function returnClosure(): number {
    value += 1;

    return value;
  };
}

const getNextValueForOptionData = closureValue();

export default getNextValueForOptionData;
