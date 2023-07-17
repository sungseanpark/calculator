function add(a, b) {
    return a + b;
};
  
function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a,b) {
    if(b==0){
        return 'ERROR';
    }
    return a / b;
};

function operate(a, b, op) {
    switch(op){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '×':
            return multiply(a,b);
        case '÷':
            return divide(a,b);

    }
};

function displayNumber(e) {
    switch(state){
        case 'firstNum':
            displayContent += e.target.textContent;
            displayElem.textContent = displayContent;
            break;
        case 'operator':
            displayContent = '' + e.target.textContent;
            displayElem.textContent = displayContent;
            evalButton.addEventListener('click', evaluateExpression);
            state = 'secondNum';
            break;
        case 'secondNum':
            displayContent += e.target.textContent;
            displayElem.textContent = displayContent;
            break;
    }

}

function displayOperator(e) {
    switch(state){
        case 'firstNum':
            firstNum = Number(displayContent);
            operator = e.target.textContent;
            state = 'operator';
            break;

    }

}

function evaluateExpression() {
    secondNum = Number(displayContent);
    let result = operate(firstNum, secondNum, operator);
    displayContent = result;
    displayElem.textContent = displayContent;
    evalButton.removeEventListener('click', evaluateExpression);
    state = 'evaluated';
}

let firstNum;
let secondNum;
let operator;
let displayContent = '';
let state = 'firstNum';

const displayElem = document.querySelector('.display');

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', displayNumber);
});
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', displayOperator);
});

const evalButton = document.querySelector('.eval');


