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
let firstSignState = true, secondSignState = true;

function clearEquation () {
    firstNumber = "0";
    secondNumber = "";
    operationState = false;
    secondNumberState = false;
    firstCommaState = false;
    secondCommaState = false;
    firstSignState = true;
    secondSignState = true;
    output.textContent = "0";
}

function displayError (string) {
    clearEquation();
    errorState = true;
    output.textContent = string;
}

function add (firstString, secondString) {
    let a = parseFloat(firstString);
    let b = parseFloat(secondString);

    return (a + b).toString();
}

function subtract (firstString, secondString) {
    let a = parseFloat(firstString);
    let b = parseFloat(secondString);

    return (a - b).toString();
}

function multiply (firstString, secondString) {
    let a = parseFloat(firstString);
    let b = parseFloat(secondString);

    return (a * b).toString();
}

function divide (firstString, secondString) {
    let a = parseFloat(firstString);
    let b = parseFloat(secondString);

    if (b == 0) {
        displayError("Mama m-ai spart...");
        return "0";
    }
    else
        return (Math.round(a / b * 1000) / 1000).toString();
}

function mod(firstString, secondString) {
    let a = parseFloat(firstString);
    let b = parseFloat(secondString);

    if (b == 0) {
        displayError("Pe bune?");
        return "0";
    }
    else if (a < 0 || b < 0 || isNaN(a) || isNaN(b)) {
        displayError("Gandeste pozitiv!");
        return "0";
    }
    else
        return (Math.round(a % b * 1000) / 1000).toString();
}

function outputEquation () {
    let equation = firstNumber;
    if (firstSignState == false)
        equation = "(" + firstNumber + ")";

    if (operationState == true)
        equation += " " + operation;

    if (secondNumberState == true) {
        if (secondSignState == false)
            equation += " (" + secondNumber + ")";
        else
        equation += " " + secondNumber;
    }

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

        outputEquation();
    }
}

function addComma () {
    if (errorState == false) {
        //daca ma aflu la primul numar
        if (operationState == false) {
            if (firstCommaState == false) {
                firstCommaState = true;
                firstNumber += ".";
            }
        }
        //al doilea numar
        else {
            if (secondCommaState == false) {
                secondCommaState = true;
                if (secondNumberState == false) {
                    secondNumber = "0.";
                    secondNumberState = true;
                }
                else {
                    secondNumber += ".";
                }
            }
        }

        outputEquation();
    }
}

function changeSign () {
    if (errorState == false) {
        //daca ma aflu la primul numar
        if (operationState == false) {
            if (firstSignState == true) {
                firstSignState = false;
                firstNumber = "-" + firstNumber;
            }
            else {
                firstSignState = true;
                firstNumber = (parseFloat(firstNumber) * (-1)).toString();
            }
        }
        //al doilea numar
        else if (secondNumberState == true) {
            if (secondSignState == true) {
                secondSignState = false;
                secondNumber = "-" + secondNumber;
            }
            else {
                secondSignState = true;
                secondNumber = (parseFloat(secondNumber) * (-1)).toString();
            }
        }

        outputEquation();
    }
}

function operate () {
    if (errorState == false) {
        if (operationState == true) {
            if (secondNumberState == true) {
                if (operation == "+")
                    firstNumber = add(firstNumber, secondNumber);

                if (operation == "-")
                    firstNumber = subtract(firstNumber, secondNumber);

                if (operation == "×")
                    firstNumber = multiply(firstNumber, secondNumber);

                if (operation == "÷")
                    firstNumber = divide(firstNumber, secondNumber);

                if (operation == "%")
                    firstNumber = mod(firstNumber, secondNumber);
            }
            
            if (firstNumber < 0)
                firstSignState = false;
            else
                firstSignState = true;

            if (parseInt(firstNumber) === firstNumber)
                firstCommaState = false;
            else
                firstCommaState = true;
            
            secondNumber = "";
            secondNumberState = false;

            secondCommaState = false;
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
    }
    if (errorState == false) 
        outputEquation();
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
    clearEquation();
    errorState = false;
});
equals.addEventListener("click", () => {
    operate();
    operationState = false;
});
comma.addEventListener("click", () => {
    addComma();
});
sign.addEventListener("click", () => {
    changeSign();
});
question.addEventListener("click", () => {
    displayError("Doi scheleti se trag de...");
});
