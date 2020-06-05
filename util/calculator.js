export const initialState = {
  currentValue: "0", //setting to 0 as a string
  operator: null,
  previousValue: null,
};

export const handleNumber = (value, state) => {
  if (state.currentValue === "0") {
    return {currentValue: `${value}`} //removes the 0
  }
  return {
  currentValue: `${state.currentValue}${value}` //appending the number
  };
}

export const handleEqual = (state) => {
  const { currentValue, previousValue, operator } = state;

  //converted from String to Float
  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = {
    operator: null,
    previousValue: null,
  };

  if (operator === "/") {
    return {
      currentValue: previous / current,
      ...resetState
    };
  }

  if (operator === "*") {
    return {
      currentValue: previous * current,
      ...resetState
    };
  }

  if (operator === "+") {
    return {
      currentValue: previous + current,
      ...resetState
    };
  }

  if (operator === "-") {
    return {
      currentValue: previous - current,
      ...resetState
    };
  }
}

const calculator = (type, value, state) => {
  switch(type) {
    case "number":
      return handleNumber(value, state);
    case "operator":
      return {
        operator: value, //go back to 0 when inputting a new number
        previousValue: state.currentValue, //currentValue will be stored to previousValue
        currentValue: "0", //currentValue is now empty
      };
    case "equal":
      return handleEqual(state);
    case "clear":
      return initialState;
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`
      };
    default:
      return state;
  }
};

export default calculator;
