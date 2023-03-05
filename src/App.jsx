import { useState } from 'react';
import './App.css';

function Button({ value, className, handleClick }) {
  // using an input element to accept keydown events.
  return (
    <input
      type="button"
      className={className}
      value={value}
      onClick={handleClick}
    />
  );
}

function ButtonRow({ children }) {
  return <div className="button-row">{children}</div>;
}

function Display({ value }) {
  const setClassName = (val) => {
    let clsName;
    if (val.length <= 6) {
      clsName = 'output-value'
    } else if (val.length === 7) {
      clsName = 'output-value shrink-1';
    } else if (val.length === 8) {
      clsName = 'output-value shrink-2';
    } else if (val.length === 9) {
      clsName = 'output-value shrink-3';
    }
    return clsName;
  }
  return <div className={setClassName(value)}>{value}</div>
}

function Calculator() {
  const MAX_DISPLAY_LENGTH = 9;
  let [display, setDisplay] = useState('0');
  let [currentValue, setCurrentValue] = useState(display);
  let [previousValue, setPreviousValue] = useState('0');
  let [additionClicked, setAdditionClicked] = useState(false);

  const handleAddNumberToDisplay = (n) => {
    // iOS calculator doesn't go beyond 9 in portrait view so stop taking input
    if (display.length >= MAX_DISPLAY_LENGTH) {
      return;
    }
    if (display === '0') {
      setDisplay(n);
      setCurrentValue(display);
    } else {
      setDisplay(display += n);
      setCurrentValue(display);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('0');
    setPreviousValue('0');
    setAdditionClicked(false);
  };

  const handleAdditionClick = () => {
    setAdditionClicked(true);
    setPreviousValue(currentValue);
    setCurrentValue('0');
    // would like to keep the display where it is instead of clearing it out.
    // current need to make it zero to update the currentValue for calculations.
    setDisplay('0');
  }

  const handleCalculation = () => {
    let output;
    if (additionClicked) {
      output = parseInt(previousValue) + parseInt(currentValue);
      setDisplay(output.toString());
      setCurrentValue('0');
      setPreviousValue('0');
    }
  }

  return (
    <section className="calculator">
      <section className="output">
        <Display value={display} />
      </section>
      <ButtonRow>
        <Button
          className={'btn light-gray'}
          value="AC"
          handleClick={() => handleClear()}
        />
        <Button className={'btn light-gray'} value="&plusmn;" handleClick={() => console.log(currentValue)} />
        <Button className={'btn light-gray'} value="&#37;" />
        <Button className={'btn orange'} value="&divide;" />
      </ButtonRow>
      <ButtonRow>
        <Button
          className={'btn dark-gray'}
          value="7"
          handleClick={() => handleAddNumberToDisplay('7')}
        />
        <Button
          className={'btn dark-gray'}
          value="8"
          handleClick={() => handleAddNumberToDisplay('8')}
        />
        <Button
          className={'btn dark-gray'}
          value="9"
          handleClick={() => handleAddNumberToDisplay('9')}
        />
        <Button className={'btn orange'} value="&times;" />
      </ButtonRow>
      <ButtonRow>
        <Button
          className={'btn dark-gray'}
          value="4"
          handleClick={() => handleAddNumberToDisplay('4')}
        />
        <Button
          className={'btn dark-gray'}
          value="5"
          handleClick={() => handleAddNumberToDisplay('5')}
        />
        <Button
          className={'btn dark-gray'}
          value="6"
          handleClick={() => handleAddNumberToDisplay('6')}
        />
        <Button className={'btn orange'} value="&minus;" />
      </ButtonRow>
      <ButtonRow>
        <Button
          className={'btn dark-gray'}
          value="1"
          handleClick={() => handleAddNumberToDisplay('1')}
        />
        <Button
          className={'btn dark-gray'}
          value="2"
          handleClick={() => handleAddNumberToDisplay('2')}
        />
        <Button
          className={'btn dark-gray'}
          value="3"
          handleClick={() => handleAddNumberToDisplay('3')}
        />
        <Button className={'btn orange'} value="&#43;" handleClick={() => handleAdditionClick()} />
      </ButtonRow>
      <ButtonRow>
        <Button className={'btn dark-gray zero-btn'} value="0" handleClick={() => handleAddNumberToDisplay('0')} />
        <Button className={'btn dark-gray'} value="." />
        <Button className={'btn orange'} value="&#61;" handleClick={() => handleCalculation()} />
      </ButtonRow>
    </section>
  );
}

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
