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
let comma = document.querySelector(".comma");

let firstNumber = "0", secondNumber = "", secondNumberState = false;
let operation, operationState = false;
let errorState = false;
let firstCommaState = false, secondCommaState = false;

function clearEcuation () {
    firstNumber = "0";
    secondNumber = "";
    operationState = false;
    secondNumberState = false;
    output.textContent = "0";
}

function displayError (string) {
    clearEcuation();
    errorState = true;
    output.textContent = string;
}

function add (firstString, secondString) {
    let a = parseInt(firstString);
    let b = parseInt(secondString);

    return (a + b).toString();
}

function subtract (firstString, secondString) {
    let a = parseInt(firstString);
    let b = parseInt(secondString);

    return (a - b).toString();
}

function multiply (firstString, secondString) {
    let a = parseInt(firstString);
    let b = parseInt(secondString);

    return (a * b).toString();
}

function divide (firstString, secondString) {
    let a = parseInt(firstString);
    let b = parseInt(secondString);

    if (b == 0)
        return "Pe bune?"
    else
        return (Math.round(a / b * 1000) / 1000).toString();
}

function mod(firstString, secondString) {
    let a = parseInt(firstString);
    let b = parseInt(secondString);

    if (b == 0)
        displayError("Serios?");
    else if (a < 0 || b < 0 || isNaN(a) || isNaN(b))
        displayError("Invalid input");
    else
        return (Math.round(a % b * 1000) / 1000).toString();
}

function outputEcuation () {
    let equation = firstNumber;

    if (operationState == true)
        equation += " " + operation;

    if (secondNumberState == true)
        equation += " " + secondNumber;

    output.textContent = equation;
}

function addDigit (digit) {
    if (errorState == false) {
        //firstNumber
        if (operationState == false) {
            if(firstNumber == "0")
                firstNumber = digit;
            else
                firstNumber = firstNumber + digit;
        }
        //secondNumber
        else {
            if (secondNumberState == false || secondNumber == "0") {
                secondNumberState = true;
                secondNumber = digit;
            }
            else
                secondNumber = secondNumber + digit;
        }

        outputEcuation();
    }
}

function addComma () {
    
}

function operate () {
    if (errorState == false) {
        if (operationState == true) {
            if (operation == "+") {
                firstNumber = add(firstNumber, secondNumber);
                secondNumber = "";
            }

            if (operation == "-") {
                firstNumber = subtract(firstNumber, secondNumber);
                secondNumber = "";
            }

            if (operation == "×") {
                firstNumber = multiply(firstNumber, secondNumber);
                secondNumber = "";
            }

            if (operation == "÷") {
                firstNumber = divide(firstNumber, secondNumber);
                secondNumber = "";
            }

            if (operation == "%") {
                firstNumber = mod(firstNumber, secondNumber);
                secondNumber = "";
            }
        }
    }
    if (errorState == false)
        output.textContent = firstNumber;
}

function changeOperation (newOperation) {
    if (errorState == false) {
        if (operationState == false) {
            operationState = true;
            operation = newOperation;
        }
        else if (secondNumberState == true) {
            operate();
            operation = newOperation;
        }
        else
            operation = newOperation;
        
        outputEcuation();
    }
}

zero.addEventListener("click", () => {
    addDigit("0");
});
one.addEventListener("click", () => {
    addDigit("1");
});
two.addEventListener("click", () => {
    addDigit("2");
});
three.addEventListener("click", () => {
    addDigit("3");
});
four.addEventListener("click", () => {
    addDigit("4");
});
five.addEventListener("click", () => {
    addDigit("5");
});
six.addEventListener("click", () => {
    addDigit("6");
});
seven.addEventListener("click", () => {
    addDigit("7");
});
eight.addEventListener("click", () => {
    addDigit("8");
});
nine.addEventListener("click", () => {
    addDigit("9");
});

addButton.addEventListener("click", () => {
    changeOperation("+");
});
subtractButton.addEventListener("click", () => {
    changeOperation("-");
});
multiplyButton.addEventListener("click", () => {
    changeOperation("×");
});
divideButton.addEventListener("click", () => {
    changeOperation("÷");
});
modButton.addEventListener("click", () => {
    changeOperation("%");
});

clear.addEventListener("click", () => {
    clearEcuation();
    errorState = false;
});
equals.addEventListener("click", () => {
    operate();
    operationState = false;
});
comma.addEventListener("click", () => {
    addComma();
});
question.addEventListener("click", () => {
    displayError("Doi scheleti se trag de...");
});