import React, { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('0');

  const handleButtonClick = (value) => {
    if (input === '' && value === '0') {
      // Prevents multiple leading zeros
      return;
    }
    if (value === '.' && input.split(/[\+\-\*\/]/).pop().includes('.')) {
      // Prevents multiple decimals in a number
      return;
    }
    setInput((prev) => prev + value);
  };

  const handleOperatorClick = (operator) => {
    if (input !== '' && '+-*/'.includes(input.slice(-1))) {
      // If the last character is an operator, replace it with the new one
      setInput(input.slice(0, -1) + operator);
    } else if (input !== '') {
      setInput(input + operator);
    }
  };

  const calculateResult = () => {
    try {
      const result = evaluate(input).toString();
      setResult(result);
      setInput('');
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('0');
  };

  return (
    <div className="calculator">
      <div id="display">{input || result}</div>
      <button id="clear" onClick={clearInput}>C</button>
      <button id="zero" onClick={() => handleButtonClick('0')}>0</button>
      <button id="one" onClick={() => handleButtonClick('1')}>1</button>
      <button id="two" onClick={() => handleButtonClick('2')}>2</button>
      <button id="three" onClick={() => handleButtonClick('3')}>3</button>
      <button id="four" onClick={() => handleButtonClick('4')}>4</button>
      <button id="five" onClick={() => handleButtonClick('5')}>5</button>
      <button id="six" onClick={() => handleButtonClick('6')}>6</button>
      <button id="seven" onClick={() => handleButtonClick('7')}>7</button>
      <button id="eight" onClick={() => handleButtonClick('8')}>8</button>
      <button id="nine" onClick={() => handleButtonClick('9')}>9</button>
      <button id="add" onClick={() => handleOperatorClick('+')}>+</button>
      <button id="subtract" onClick={() => handleOperatorClick('-')}>-</button>
      <button id="multiply" onClick={() => handleOperatorClick('*')}>*</button>
      <button id="divide" onClick={() => handleOperatorClick('/')}>/</button>
      <button id="decimal" onClick={() => handleButtonClick('.')}>.</button>
      <button id="equals" onClick={calculateResult}>=</button>
    </div>
  );
}

export default App;
