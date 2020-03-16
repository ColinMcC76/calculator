// creates my proto class "element", used to putbasic html elements on the page. 
class Element {
    constructor(elementType) {
        this.element = document.createElement(elementType)
    }
    buildElement(classes = "", id = "", textContent = "", type = "") {
        this.element.className = classes;
        this.element.id = id;
        this.element.innerHTML = textContent;
        this.element.type = type;
    };
    appendElement(parent, child) {
        parent.element.appendChild(child.element)
    }
}
// I extended the element class to make a button subclass, initially I added the onclick function here, but never actually utilized that part of the function.  
class Button extends Element {
    constructor(elementType) {
        super(elementType)
    }
}

// this creates the view class that puts all the html elements on the page, utilizing the buildCalc function. 
class View {
    constructor() {};

    buildCalc() {
        // I chose to create every div, so that I could manipulate each individually, with ease. By giving my buttons a type, I was able to select all of them by their personal type, (number),(operation),(del)...
        let myApp = document.getElementById("myApp")
        myApp.className = "container-fluid"
        let row = new Element("div")
        row.buildElement("row", "row")
        let screen = new Element('div')
        screen.buildElement("container-fluid d-flex flex-column justify-content-around col-12", "calculatorScreen")
        let previousOpp = new Element('div')
        previousOpp.buildElement('', 'previousOpp', '', 'previousOpp')
        let currentOpp = new Element('div')
        currentOpp.buildElement('', "currentOpp", '', 'currentOpp')
        let allClear = new Button("button");
        allClear.buildElement("col-6 btn btn-primary", "allClear", "AC", "allClear")

        let del = new Button('button')
        del.buildElement("col-3 btn btn-primary", "delete", "del", "del")
        let divide = new Button('button')
        divide.buildElement("col-3 btn btn-primary", "divide", "÷", "operation")

        let one = new Button('button')
        one.buildElement("col-3 btn btn-primary", "one", "1", "number")

        let two = new Button('button')
        two.buildElement("col-3 btn btn-primary", "two", "2", "number")
        let three = new Button('button')
        three.buildElement("col-3 btn btn-primary", "three", "3", "number")
        let multiply = new Button('button')
        multiply.buildElement("col-3 btn btn-primary", "multiply", "x", "operation")

        let four = new Button('button')
        four.buildElement("col-3 btn btn-primary", "four", "4", "number")
        let five = new Button('button')
        five.buildElement("col-3 btn btn-primary", "five", "5", "number")
        let six = new Button('button')
        six.buildElement("col-3 btn btn-primary", "six", "6", "number")
        let plus = new Button('button')
        plus.buildElement("col-3 btn btn-primary", "plus", "+", "operation")

        let seven = new Button('button')
        seven.buildElement("col-3 btn btn-primary", "seven", "7", "number")
        let eight = new Button('button')
        eight.buildElement("col-3 btn btn-primary", "eight", "8", "number")
        let nine = new Button('button')
        nine.buildElement("col-3 btn btn-primary", "nine", "9", "number")
        let minus = new Button('button')
        minus.buildElement("col-3 btn btn-primary", "minus", "-", "operation")

        let zero = new Button('button')
        zero.buildElement("col-3 btn btn-primary", "zero", "0", "number")
        let decimalPoint = new Button('button')
        decimalPoint.buildElement("col-3 btn btn-primary", "decimalPoint", ".", "number")
        let equal = new Button('button')
        equal.buildElement("col-6 btn btn-primary", "equal", "=", "equal")

        previousOpp.appendElement(screen, previousOpp)
        currentOpp.appendElement(screen, currentOpp)
        screen.appendElement(row, screen)
        allClear.appendElement(row, allClear)
        del.appendElement(row, del)
        divide.appendElement(row, divide)
        one.appendElement(row, one)
        two.appendElement(row, two)
        three.appendElement(row, three)
        multiply.appendElement(row, multiply)
        four.appendElement(row, four)
        five.appendElement(row, five)
        six.appendElement(row, six)
        plus.appendElement(row, plus)
        seven.appendElement(row, seven)
        eight.appendElement(row, eight)
        nine.appendElement(row, nine)
        minus.appendElement(row, minus)
        zero.appendElement(row, zero)
        decimalPoint.appendElement(row, decimalPoint)
        equal.appendElement(row, equal)
        myApp.appendChild(row.element)


    }
}
// calculator class used to do all the actual math of the calc. 
class calculator {
    constructor(prevOp, currOp) {
            this.prevOp = prevOp;
            this.currOp = currOp;
            this.operation = undefined
        }
        // used to clear the screen of all numbers and operations. 
    allClearFunction() {
        console.log("all clear!")
        this.currOp.innerText = ""
        this.prevOp.innerText = ""
        this.operation = undefined
    };
    // used to remove the last character of the screen
    remove() {
        let l = this.currOp.innerText.length
        this.currOp.innerText = this.currOp.innerText.substring(0, l - 1)
    };
    // adds the number of the button last clicked to the screen, checks to make sure the number isnt already 9 digits, or if it already has a decimal point.
    appendNumber(number) {
            if (this.currOp.innerText.length < 10) {
                var concatStat = true
                if (this.currOp.innerText.includes('.') && number === ".") {
                    concatStat = false
                    console.log("it's a decimal");
                }
                if (concatStat) {
                    this.currOp.innerText += number;
                }
            }
        }
        // checks the operation of the button pushed, stores the information, and later computes the function later on.
    chooseOperation(operation) {
        if (this.currOp.innerText === "" || this.currOp.innerText === ".") return
        if (this.prevOp.innerText !== "") {
            this.compute()
        }
        this.operation = operation
        this.prevOp.innerText = this.currOp.innerText + operation;
        this.currOp.innerText = ''
    };
    // actually preforms the math of the calculator. Checks the operation based on a case switch function.
    compute() {
            let computation = 0
            const prev = parseFloat(this.prevOp.innerText)
            const current = parseFloat(this.currOp.innerText)
            if (isNaN(prev) || isNaN(current)) return
            switch (this.operation) {
                case "+":
                    computation = prev + current;
                    break;
                case "-":
                    computation = prev - current;
                    break;
                case "÷":
                    if (current !== 0) {
                        computation = prev / current;
                    } else {
                        computation = "error cannot divide by zero"
                    }
                    break;
                case "x":
                    computation = prev * current;
                    break;
            }
            this.currOp.innerText = computation
            this.operation = undefined;
            this.prevOp.innerText = ''
        }
        //  uodates the screen, is called everytime a button is pressed. 
    updateDisplay() {

        this.currOp.innerText = this.currOp.innerText
        this.prevOp.innerText = this.prevOp.innerText
    };
}


let view = new View();
view.buildCalc();
// creates the calculator on the page


const numberButtons = document.querySelectorAll('button[type="number"]');
const operationButtons = document.querySelectorAll('button[type="operation"]');
const equalButton = document.querySelector('button[type="equal"]');
const deleteButton = document.querySelector('button[type="del"]');
// console.log(deleteButton)
const allClearButton = document.querySelector('button[type="allClear"]');
const previousOperandTextDisplay = document.getElementById('previousOpp');
const currentOperandTextDisplay = document.getElementById('currentOpp');
// goes through all buttons, selects certain ones by type, and allows me to assign specific functions.



let calc1 = new calculator(previousOperandTextDisplay, currentOperandTextDisplay);
calc1.updateDisplay()
    //actually creates the computer behind the calc to do the math.


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc1.appendNumber(button.innerText);
        calc1.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc1.chooseOperation(button.innerText);
        calc1.updateDisplay()
    })
})

allClearButton.addEventListener('click', () => {
    calc1.allClearFunction();
    calc1.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calc1.remove();
    calc1.updateDisplay();
})
equalButton.addEventListener('click', () => {
    calc1.compute();
    calc1.updateDisplay();
})

//all the event listeners added to the button.