import React, { Component } from 'react';
import Button from './components/Button'
import './App.css';

const TOTAL_ID = 'display-total'

const AC_TEXT = 'AC'
const DECIMAL_SIGN = '.'
const POS_NEG_SIGN = '+/-'
const NEG_SIGN = '-'
const PERCENT_SIGN = '%'

const DIVIDE_SIGN       = '÷'
const DIVIDE_OPERATOR   = '/'

const MULTIPLY_SIGN     = 'x'
const MULTIPLY_OPERATOR = '*'

const MINUS_OPERATOR    = '-'
const ADD_OPERATOR      = '+'
const EQUAL_OPERATOR    = '='

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTotal: '0',
      lastTotal: '0',
      displayTotal: '0',
      operator: null,
      lastInput: null,
    }
    this.togglePosNegSign = this.togglePosNegSign.bind(this)
    this.setOperator = this.setOperator.bind(this)
    this.concatTotal = this.concatTotal.bind(this)
    this.clearTotal = this.clearTotal.bind(this)
    this.makePercent = this.makePercent.bind(this)
    this.evaluateEquation = this.evaluateEquation.bind(this)
  }

  clearTotal() {
    this.setState({currentTotal: '0', displayTotal: '0', lastInput: AC_TEXT})
  }

  concatTotal(e) {
    const { currentTotal } = this.state
    const targetText = e.target.innerText
    let newString

    if (this._hasDecimal(currentTotal) && this._isDecimalSign(targetText)) {
      return
    }

    if (this._hasLastInputEvaluatedEquation() && this._isDecimalSign(targetText)) {
      return this.setState({ currentTotal: "0.", displayTotal: "0.", lastInput: DECIMAL_SIGN})
    }

    if (currentTotal === '0' || currentTotal === '-0') {
      if (this._isDecimalSign(targetText)) {
        newString = currentTotal.concat(DECIMAL_SIGN)
      } else {
        newString = targetText
      }
    } else {
      newString = currentTotal.concat(targetText)
    }
    this.setState({currentTotal: newString, displayTotal: newString, lastInput: targetText})
  }

  togglePosNegSign() {
    const { currentTotal } = this.state
    let newString
    if (currentTotal.indexOf(NEG_SIGN) > -1) {
      newString = currentTotal.substring(1, currentTotal.length)
    } else {
      newString = NEG_SIGN.concat(currentTotal)
    }
    this.setState({ currentTotal: newString, displayTotal: newString, lastInput: POS_NEG_SIGN})
  }

  makePercent() {
    let newTotal = parseFloat(this.state.displayTotal) / 100
    newTotal = "" + newTotal
    this.setState({currentTotal: newTotal, displayTotal: newTotal, lastInput: PERCENT_SIGN})
  }

  setOperator(e) {
    const { displayTotal } = this.state
    let newOperator

    this._removeFocusedCss();
    this._addFocusedCss(e.target);

    switch (e.target.innerText) {
      case MULTIPLY_SIGN:
        newOperator = MULTIPLY_OPERATOR
        break
      case DIVIDE_SIGN:
        newOperator = DIVIDE_OPERATOR
        break
      default:
        newOperator = e.target.innerText
    }

    this.setState({operator: newOperator, lastTotal: displayTotal, currentTotal: '0', lastInput: newOperator})
  }

  evaluateEquation() {
    const { lastTotal, currentTotal, operator } = this.state
    let newTotal

    if (!operator) {
      return
    }

    newTotal = "" + eval(lastTotal + operator + currentTotal)
    this.setState({lastTotal: newTotal, displayTotal: newTotal, lastInput: EQUAL_OPERATOR})
    this._removeFocusedCss();
  }

  _hasDecimal(currentTotal) {
    return currentTotal.indexOf(DECIMAL_SIGN) > -1
  }

  _isDecimalSign(targetText) {
    return targetText === DECIMAL_SIGN
  }

  _hasLastInputEvaluatedEquation() {
    return this.state.lastInput === EQUAL_OPERATOR
  }

  // :focus pseudo-selector does not work properly
  _addFocusedCss(element) {
    element.style.filter = "brightness(85%)";
  }

  _removeFocusedCss() {
    const operatorDivs = document.getElementsByClassName('operator')

    for (let i = 0; i < operatorDivs.length; i++) {
      operatorDivs[i].style.removeProperty('filter')
    }
  }

  render() {
    return (
      <div className="App">
        <div id={TOTAL_ID} className="white bg-black tr pt4 pb2">{this.state.displayTotal}</div>
        <div>
          <Button buttonType={"topBar"} onClick={this.clearTotal} text={AC_TEXT}/>
          <Button buttonType={"topBar"} onClick={this.togglePosNegSign} text={POS_NEG_SIGN}/>
          <Button buttonType={"topBar"} onClick={this.makePercent} text={PERCENT_SIGN}/>
          <Button buttonType={"rightBar"} onClick={this.setOperator} text={DIVIDE_SIGN}/>
        </div>
        <div>
          <Button buttonType={"generic"} onClick={this.concatTotal} text={7}/>
          <Button buttonType={"generic"} onClick={this.concatTotal} text={8}/>
          <Button buttonType={"generic"} onClick={this.concatTotal} text={9}/>
          <Button buttonType={"rightBar"} onClick={this.setOperator} text={MULTIPLY_SIGN}/>
        </div>
        <div>
          <Button buttonType={"generic"} onClick={this.concatTotal} text={4}/>
          <Button buttonType={"generic"} onClick={this.concatTotal} text={5}/>
          <Button buttonType={"generic"} onClick={this.concatTotal} text={6}/>
          <Button buttonType={"rightBar"} onClick={this.setOperator} text={MINUS_OPERATOR}/>
        </div>
        <div>
          <Button buttonType={"generic"} onClick={this.concatTotal} text={1}/>
          <Button buttonType={"generic"} onClick={this.concatTotal} text={2}/>
          <Button buttonType={"generic"} onClick={this.concatTotal} text={3}/>
          <Button buttonType={"rightBar"} onClick={this.setOperator} text={ADD_OPERATOR}/>
        </div>
        <div>
          <div className="button bb br fl w-50 tl pv3 bg-light-gray pl4" onClick={this.concatTotal}>0</div>
          <Button buttonType={"generic"} onClick={this.concatTotal} text={DECIMAL_SIGN}/>
          <Button buttonType={"rightBar"} onClick={this.evaluateEquation} text={EQUAL_OPERATOR}/>
        </div>
      </div>
    );
  }
}

export default App;
