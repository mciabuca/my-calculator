import React, { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('0');

  const handleButtonClick = (value) => {
    if (input === '' && value === '0') {
      return;
    }
    if (value === '.' && input.split(/[\+\-\*\/]/).pop().includes('.')) {
      return;
    }
    setInput((prev) => prev + value);
  };

  const handleOperatorClick = (operator) => {
    if (input !== '') {
      if ('+-*/'.includes(input.slice(-1))) {
        if ('+-*/'.includes(input.slice(-2, -1))) {
          setInput(input.slice(0, -2) + operator);
        } else if (operator === '-' && !'+-*/'.includes(input.slice(-2, -1))) {
          setInput(input + operator);
        } else {
          setInput(input.slice(0, -1) + operator);
        }
      } else {
        setInput(input + operator);
      }
    } else if (operator === '-') {
      setInput(operator);
    }
  };
  
  
  

  const calculateResult = () => {
    try {
      const evaluatedResult = evaluate(input).toString();
      setResult(evaluatedResult);
      setInput(evaluatedResult);
    } catch (error) {
      setResult('Error');
      setInput('');
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
