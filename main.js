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
class Button extends Element {
    constructor(elementType, click = "") {
        super(elementType)
        this.element.onclick = click
    }
    buttonFunction() {
        console.log('buttonFunction worked')
    }

}

// var x = new Element('div')
// x.buildElement('border', 'two')
// x.appendElement(document.body, x.element)
// console.log(x)
// var y = new Button('button', allClearFunction)
// y.buildElement('border', 'two')
// y.appendElement(document.body, y.element)
// console.log(y)


class View {
    constructor() {};

    buildCalc() {
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
class calculator {
    constructor(prevOp, currOp) {
        this.prevOp = prevOp;
        this.currOp = currOp;
        this.operation = undefined
    }

    allClearFunction() {
        console.log("all clear!")
        this.currOp.innerText = ""
        this.prevOp.innerText = ""
        this.operation = undefined
    };
    remove() {
        let l = this.currOp.innerText.length
        this.currOp.innerText = this.currOp.innerText.substring(0, l - 1)
    };
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
    chooseOperation(operation) {
        if (this.currOp.innerText === "" || this.currOp.innerText === ".") return
        if (this.prevOp.innerText !== "") {
            this.compute()
        }
        this.operation = operation
        this.prevOp.innerText = this.currOp.innerText + operation;
        this.currOp.innerText = ''
    };
    compute() {
        // console.log("i'm doing it");
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
    updateDisplay() {
        // this.view
        this.currOp.innerText = this.currOp.innerText
        this.prevOp.innerText = this.prevOp.innerText
            // console.log("updating the string", this.currOp)
    };
}


let view = new View();
view.buildCalc();


const numberButtons = document.querySelectorAll('button[type="number"]');
const operationButtons = document.querySelectorAll('button[type="operation"]');
const equalButton = document.querySelector('button[type="equal"]');
const deleteButton = document.querySelector('button[type="del"]');
// console.log(deleteButton)
const allClearButton = document.querySelector('button[type="allClear"]');
const previousOperandTextDisplay = document.getElementById('previousOpp');
const currentOperandTextDisplay = document.getElementById('currentOpp');



let calc1 = new calculator(previousOperandTextDisplay, currentOperandTextDisplay);
calc1.updateDisplay()



// console.log(currentOperandTextDisplay)
// console.log(operationButtons)
// console.log(currentOperandTextDisplay)
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