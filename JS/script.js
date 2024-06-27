const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttonsConteiner = document.querySelectorAll(".buttons-conteiner button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  addDigit(digit) {
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }
  processOperation(operation) {
    if (this.currentOperationText.innerText == "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "CE":
        this.clearCurrentOperation();
        break;
      case "C":
        this.clearCurrentAndPrevious();
        break;
      case "DEL":
        this.clearLastNumber();
        break;
      case "=":
        this.result();
        break;
      default:
        return;
    }
  }

  changeOperation(operation) {
    const mathOperation = ["*", "-", "+", "/"];

    if (mathOperation.includes(operation)) {
      this.previousOperationText.innerText =
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    return;
  }

  clearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }
  clearCurrentAndPrevious() {
    this.previousOperationText.innerText = "";
    this.currentOperationText.innerText = "";
  }
  clearLastNumber() {
    let currentOP = this.currentOperationText.innerText;
    if (this.currentOperationText.innerText) {
      this.currentOperationText.innerText = currentOP.substring(
        0,
        currentOP.length - 1
      );
    }
  }

  result() {
    const resultOperation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(resultOperation);
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue == null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      if (previous == 0) {
        operationValue = current;
      }

      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttonsConteiner.forEach((buttons) => {
  buttons.addEventListener("click", (e) => {
    let buttonValue = e.target.innerText;
    if (+buttonValue >= 0 || buttonValue == ".") {
      calc.addDigit(buttonValue);
    } else {
      calc.processOperation(buttonValue);
    }
  });
});
