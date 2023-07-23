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
            evalButton.addEventListener('click', evaluateExpression);
            break;
        case 'evaluated':
            displayContent += e.target.textContent;
            displayElem.textContent = displayContent;
            state = 'firstNum';
    }

};

function displayOperator(e) {
    switch(state){
        case 'firstNum':
            firstNum = Number(displayContent);
            operator = e.target.textContent;
            state = 'operator';
            break;
        case 'operator':
            operator = e.target.textContent;
            break;
        case 'secondNum':
            evaluateExpression();
            firstNum = Number(displayContent);
            operator = e.target.textContent;
            state = 'operator';
            break;
        case 'evaluated':
            firstNum = Number(displayContent);
            operator = e.target.textContent;
            state = 'operator';
            break;

    }

};

function evaluateExpression() {
    secondNum = Number(displayContent);
    let result = operate(firstNum, secondNum, operator);
    displayContent = '' + result;
    displayElem.textContent = displayContent;
    evalButton.removeEventListener('click', evaluateExpression);
    state = 'evaluated';
};

function clearCalc() {
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    displayContent = '';
    displayElem.textContent = '0';
    state = 'firstNum';
    dotted = 'false';
};

function deleteCalc() {
    displayContent = displayContent.slice(0,displayContent.length -1);
    displayElem.textContent = displayContent;
}

function addDot() {
    switch(state){
        case 'firstNum':
            if (displayContent.includes('.')) {
                return;
            }
            if (displayContent == '') {
                displayContent = '0.';
                displayElem.textContent = displayContent;
                return;
            }
            displayContent = displayElem.textContent + '.';
            displayElem.textContent = displayContent;
            break;
        case 'operator':
            displayContent = '0.';
            displayElem.textContent = displayContent;
            state = 'secondNum';
            break;
        case 'secondNum':
            if (displayContent.includes('.')) {
                return;
            }
            displayContent = displayElem.textContent + '.';
            displayElem.textContent = displayContent;
            break;
        case 'evaluated':
            if (displayContent.includes('.')) {
                return;
            }
            displayContent = displayElem.textContent + '.';
            displayElem.textContent = displayContent;
            break;
    }
}

let firstNum;
let secondNum;
let operator;
let displayContent = '';
let state = 'firstNum';

console.log(firstNum);

const displayElem = document.querySelector('.display');

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', displayNumber);
});
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', displayOperator);
});

const dotButton = document.querySelector('.dot');
dotButton.addEventListener('click', addDot);

const evalButton = document.querySelector('.eval');

const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', clearCalc);

const deleteButton = document.querySelector('#delete');

deleteButton.addEventListener('click', deleteCalc);


