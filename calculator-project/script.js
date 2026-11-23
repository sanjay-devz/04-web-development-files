const display = document.querySelector("#display");
const keys = document.querySelector(".keys");

let currentInput = "0";
let firstOperand = null;
let operator = null;
let waitingForNextNumber = false;

function updateDisplay() {
  display.value = currentInput;
}

function enterDigit(digit) {
  if (currentInput === "Error" || waitingForNextNumber) {
    currentInput = digit;
    waitingForNextNumber = false;
  } else if (currentInput === "0") {
    currentInput = digit;
  } else {
    currentInput += digit;
  }

  updateDisplay();
}

function enterDecimal() {
  if (currentInput === "Error" || waitingForNextNumber) {
    currentInput = "0";
    waitingForNextNumber = false;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
  }

  updateDisplay();
}

function chooseOperator(nextOperator) {
  const inputValue = Number(currentInput);

  if (operator && !waitingForNextNumber) {
    calculate();
  } else {
    firstOperand = inputValue;
  }

  operator = nextOperator;
  waitingForNextNumber = true;
}

function calculate() {
  if (operator === null || firstOperand === null) return;

  const secondOperand = Number(currentInput);
  let result;

  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      result = secondOperand === 0 ? NaN : firstOperand / secondOperand;
      break;
    default:
      return;
  }

  currentInput = Number.isFinite(result)
    ? String(Number(result.toPrecision(10)))
    : "Error";

  firstOperand = null;
  operator = null;
  waitingForNextNumber = true;
  updateDisplay();
}

function clearCalculator() {
  currentInput = "0";
  firstOperand = null;
  operator = null;
  waitingForNextNumber = false;
  updateDisplay();
}

function deleteDigit() {
  if (currentInput === "Error" || waitingForNextNumber) {
    currentInput = "0";
    waitingForNextNumber = false;
  } else {
    currentInput = currentInput.length > 1
      ? currentInput.slice(0, -1)
      : "0";
  }

  updateDisplay();
}

function changeSign() {
  if (currentInput !== "0" && currentInput !== "Error") {
    currentInput = currentInput.startsWith("-")
      ? currentInput.slice(1)
      : `-${currentInput}`;
    updateDisplay();
  }
}

keys.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  const { action, value } = button.dataset;

  if (action === "digit") enterDigit(value);
  if (action === "decimal") enterDecimal();
  if (action === "operator") chooseOperator(value);
  if (action === "equals") calculate();
  if (action === "clear") clearCalculator();
  if (action === "delete") deleteDigit();
  if (action === "sign") changeSign();
});