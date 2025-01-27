let output = document.querySelector(".output");

let zero = document.querySelector(".zero");
let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");
let five = document.querySelector(".five");
let six = document.querySelector(".six");
let seven = document.querySelector(".seven");
let eight = document.querySelector(".eight");
let nine = document.querySelector(".nine");

let addButton = document.querySelector(".add");
let subtractButton = document.querySelector(".subtract");
let multiplyButton = document.querySelector(".multiply");
let divideButton = document.querySelector(".divide");
let modButton = document.querySelector(".mod");

let sign = document.querySelector(".sign");
let clear = document.querySelector(".AC");
let equals = document.querySelector(".equals");
let question = document.querySelector(".question");

let firstNumber = 0, operation, operationState = false, secondNumber = null, errorFlag = false;

function clearEcuation () {
    firstNumber = 0;
    secondNumber = null;
    operationState = false;
    output.textContent = "0";
}

function displayError (string) {
    clearEcuation();
    errorFlag = true;
    output.textContent = string;
}

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b == 0)
        return "Pe bune?"
    return Math.round(a / b * 1000) / 1000;
}

function mod(a, b) {
    if (b == 0)
        displayError("Serios?");
    else if (a < 0 || b < 0 || isNaN(a) || isNaN(b))
        displayError("Invalid input");
    else
        return a % b;
}

function outputEcuation () {
    let equation = firstNumber.toString();
    if (operationState == true) {
        equation += " " + operation + " ";
    }
    if (secondNumber != null) {
        equation += secondNumber.toString();
    }

    output.textContent = equation;
}

function addDigit (digit) {
    //firstNumber
    if (operationState == false){
        if(firstNumber == 0)
            firstNumber =  digit;
        else
            firstNumber = firstNumber * 10 + digit;
    }
    //secondNumber
    else {
        if(secondNumber == null)
            secondNumber =  digit;
        else
            secondNumber = secondNumber * 10 + digit;
    }

    outputEcuation();
}

function operate () {
    if (operationState == true) {
        if (operation == "+") {
            firstNumber = add(firstNumber, secondNumber);
            secondNumber = null;
        }

        if (operation == "-") {
            firstNumber = subtract(firstNumber, secondNumber);
            secondNumber = null;
        }

        if (operation == "*") {
            firstNumber = multiply(firstNumber, secondNumber);
            secondNumber = null;
        }

        if (operation == "/") {
            firstNumber = divide(firstNumber, secondNumber);
            secondNumber = null;
        }

        if (operation == "%") {
            firstNumber = mod(firstNumber, secondNumber);
            secondNumber = null;
        }
    }

    if (errorFlag == false)
        output.textContent = firstNumber;
    else
        errorFlag = false;
}

function changeOperation (newOperation) {
    if (operationState == false) {
        operationState = true;
        operation = newOperation;
    }
    else {
        if (secondNumber != null)
            operate();
        operation = newOperation;
    }
    outputEcuation();
}

zero.addEventListener("click", () => {
    addDigit(0);
});
one.addEventListener("click", () => {
    addDigit(1);
});
two.addEventListener("click", () => {
    addDigit(2);
});
three.addEventListener("click", () => {
    addDigit(3);
});
four.addEventListener("click", () => {
    addDigit(4);
});
five.addEventListener("click", () => {
    addDigit(5);
});
six.addEventListener("click", () => {
    addDigit(6);
});
seven.addEventListener("click", () => {
    addDigit(7);
});
eight.addEventListener("click", () => {
    addDigit(8);
});
nine.addEventListener("click", () => {
    addDigit(9);
});

addButton.addEventListener("click", () => {
    changeOperation("+");
});

subtractButton.addEventListener("click", () => {
    changeOperation("-");
});

multiplyButton.addEventListener("click", () => {
    changeOperation("*");
});

divideButton.addEventListener("click", () => {
    changeOperation("/");
});

modButton.addEventListener("click", () => {
    changeOperation("%");
});

clear.addEventListener("click", () => {
    clearEcuation();
});

equals.addEventListener("click", () => {
    operate();
    operationState = false;
});

question.addEventListener("click", () => {
    displayError("Doi scheleti se trag de...");
    errorFlag = false;
});