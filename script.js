document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.innerText;

            // Clear the display when 'C' is pressed
            if (value === 'C') {
                display.value = '';
                currentInput = '';
                operator = '';
                firstOperand = '';
                return;
            }

            // If '=' is pressed, calculate the result
            if (value === '=') {
                if (currentInput && firstOperand && operator) {
                    display.value = calculate(parseFloat(firstOperand), parseFloat(currentInput), operator);
                    currentInput = display.value;
                    operator = '';
                    firstOperand = '';
                }
                return;
            }

            // If an operator (+, -, *, /) is pressed
            if (['+', '-', '*', '/'].includes(value)) {
                if (!operator && currentInput) {
                    operator = value;
                    firstOperand = currentInput;
                    currentInput = '';
                }
                return;
            }

            // Append number or decimal point to the input
            currentInput += value;
            display.value = currentInput;
        });
    });

    // Function to perform the calculation
    function calculate(operand1, operand2, operator) {
        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return operand2 !== 0 ? operand1 / operand2 : 'Error';
            default:
                return 'Error';
        }
    }
});