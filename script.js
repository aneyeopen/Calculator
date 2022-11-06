

class Calculator {
    constructor(prevOpTextElement, currOpTextElement) {
        this.prevOpTextElement = prevOpTextElement;
        this.currOpTextElement = currOpTextElement;
        this.clearOp();
    }

clearOp() {
    this.currOp = '';
    this.prevOp = '';
    this.operation = undefined;
}



deleteOp() {
    this.currOp = this.currOp.toString().slice(0, -1)

}

appendNumber(number) {
    if (number === '.' && this.currOp.includes('.')) return;
    this.currOp = this.currOp.toString() + number.toString();
}

chooseOp(operation) {
    if (this.currOp === '') return;
    if (this.prevOp !== '') {
        this.computeOp();
    }
    this.operation = operation;
    this.prevOp = this.currOp;
    this.currOp = '';

}

computeOp() {
    let computation
    const prev = parseFloat(this.prevOp)
    const current = parseFloat(this.currOp)
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '÷':
        computation = prev / current
        break
        default:
            return
    }
    this.currOp = computation
    this.operation = undefined
    this.prevOp = ''

}

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ''
    }else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
}

updateDisplay() {
    this.currOpTextElement.innerText = this.getDisplayNumber(this.currOp);
    if (this.operation != null) {
        this.prevOpTextElement.innerText = `${this.getDisplayNumber(this.prevOp)} ${this.operation}`;
    } else {
        this.prevOpTextElement.innerText = ''
    }
}

}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const prevOpTextElement = document.querySelector('[data-prev-op]');
const currOpTextElement = document.querySelector('[data-curr-op]');



const calculator = new Calculator(prevOpTextElement, currOpTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.computeOp();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clearOp();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.deleteOp();
    calculator.updateDisplay();
})