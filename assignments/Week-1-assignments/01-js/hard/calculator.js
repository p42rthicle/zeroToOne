/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  isDigit(char) {
    let code = char.charCodeAt(0);
    return (code >= 48 && code <= 57);
  }

  // Basically correct placement of decimal points
  isPartOfNumber(char, index, expression) {
    return this.isDigit(char) ||
    (char === '.' && index - 1 > 0 && this.isDigit(expression[index - 1])
    && index + 1 < expression.length && this.isDigit(expression[index + 1]));
  }

  isValidChar(char) {
    let validChars = new Set([' ', '+', '-', '*', '/', '(', ')', '.']);
    return this.isDigit(char) || validChars.has(char);
  }

  validExpression(expression) {
    let pairs = 0;
    let cleanedExpr = "";
    for (let i=0; i<expression.length; i++) {
      let char = expression[i];
      if (!this.isValidChar(char)) throw new Error(`Invalid character '${char}' at position ${i}`);
      if (char == '(') pairs += 1;
      if (char == ')') pairs -= 1;
      // To check the parenthesis come in correct order
      if (pairs < 0) throw new Error("Invalid expression, unmatched parentheses");
      if (char !== ' ') cleanedExpr += char;
    }
    if (pairs != 0) throw new Error("Invalid expression, unmatched parenthesis");
    return cleanedExpr
  }

  // Finds the full number starting from certain index
  parseNumber(expression, index) {
    let numStr = "";
    let hasDecimal = false;
    let char = expression[index]

    while (index < expression.length && (this.isDigit(char) || char === '.')) {
        if (char === '.') {
            if (hasDecimal) throw new Error(`Invalid decimal format at position ${index}`);
            hasDecimal = true;

            if (index === expression.length - 1 || !this.isDigit(expression[index + 1])) {
                throw new Error(`Invalid decimal format at position ${index}`);
            }
        }
        numStr += char;
        index++;
        char = expression[index];
    }

    return { number: parseFloat(numStr), nextIndex: index };
  }
  

  applyOperation(numStack, opStack) {
    if (numStack.length < 2 || opStack.length === 0) {
      throw new Error("Invalid expression: missing numbers or operators.");
    }

    let num2 = numStack.pop();
    let num1 = numStack.pop();
    let op = opStack.pop();

    switch (op) {
      case '+': numStack.push(num1 + num2); break;
      case '-': numStack.push(num1 - num2); break;
      case '*': numStack.push(num1 * num2); break;
      case '/':
        if (num2 === 0) throw new Error("Division by zero is not allowed.");
        numStack.push(num1 / num2);
        break;
    }
  }

  add(number) {
    this.result += number
  }

  subtract(number) {
    this.result -= number
  }

  multiply(number) {
    this.result *= number
  }

  divide(number) {
    if (number === 0) throw new Error("Division by zero is not allowed.")
    this.result /= number
  }

  clear() {
    this.result = 0
  }

  getResult() {
    return this.result
  }

  precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  }

  calculate(expr) {
    let expression = this.validExpression(expr);
  
    let numStack = [];
    let opStack = [];
    let index = 0;
    let lastWasOperator = true; 

    while (index < expression.length) {
      let char = expression[index];
  
      // Handle characters that are part of a number
      if (this.isPartOfNumber(char, index, expression)) {
        let { number, nextIndex } = this.parseNumber(expression, index);
        numStack.push(number);
        index = nextIndex;
        lastWasOperator = false;
        continue;
      }
  
      // Handle opening parenthesis
      if (char === '(') {
        opStack.push(char);
        lastWasOperator = true;
        index++;
        continue;
      }
  
      // Handle closing parenthesis
      if (char === ')') {
        while (opStack.length && opStack[opStack.length - 1] !== '(') {
          this.applyOperation(numStack, opStack);
        }
        if (!opStack.length) throw new Error("Mismatched parentheses.");
        opStack.pop(); // Remove '('
        lastWasOperator = false;
        index++;
        continue;
      }
  
      // Handle operators
      if ("+-*/".includes(char)) {
        if (lastWasOperator) throw new Error(`Unexpected operator '${char}' at position ${index}`);
        while (opStack.length && this.precedence[opStack[opStack.length - 1]] >= this.precedence[char]) {
          this.applyOperation(numStack, opStack);
        }
        opStack.push(char);
        lastWasOperator = true;
        index++;
        continue;
      }
    }
  
    // Process remaining operators
    while (opStack.length) {
      this.applyOperation(numStack, opStack);
    }
  
    if (numStack.length !== 1) throw new Error("Invalid expression: too many numbers or missing operators.");
    this.result = numStack[0];
  }  
}

module.exports = Calculator;