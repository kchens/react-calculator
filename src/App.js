import React, { Component } from 'react';
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
    const operatorDivs = document.getElementsByClassName('operator')

    for (let i = 0; i < operatorDivs.length; i++) {
      operatorDivs[i].style.removeProperty('filter')
    }

    element.style.filter = "brightness(85%)";
  }

  render() {
    return (
      <div className="App">
        <div id={TOTAL_ID} className="white bg-black tr pt4 pb2">{this.state.displayTotal}</div>
        <div>
          <div className="button bb br fl w-25 tc pv3 bg-light-silver" onClick={this.clearTotal}>{AC_TEXT}</div>
          <div className="button bb br fl w-25 tc pv3 bg-light-silver" onClick={this.togglePosNegSign}>{POS_NEG_SIGN}</div>
          <div className="button bb br fl w-25 tc pv3 bg-light-silver" onClick={this.makePercent}>{PERCENT_SIGN}</div>
          <div className="button operator bb br b--black fl w-25 tc pv3 bg-orange white" onClick={this.setOperator}>{DIVIDE_SIGN}</div>
        </div>
        <div>
          <div className="button bb br fl w-25 tc pv3 bg-light-gray" onClick={this.concatTotal}>7</div>
          <div className="button bb br fl w-25 tc pv3 bg-light-gray" onClick={this.concatTotal}>8</div>
          <div className="button bb br fl w-25 tc pv3 bg-light-gray" onClick={this.concatTotal}>9</div>
          <div className="button operator bb br b--black fl w-25 tc pv3 bg-orange white" onClick={this.setOperator}>{MULTIPLY_SIGN}</div>
        </div>
        <div>
          <div className="button bb br fl w-25 tc pv3 bg-light-gray" onClick={this.concatTotal}>4</div>
          <div className="button bb br fl w-25 tc pv3 bg-light-gray" onClick={this.concatTotal}>5</div>
          <div className="button bb br fl w-25 tc pv3 bg-light-gray" onClick={this.concatTotal}>6</div>
          <div className="button operator bb br b--black fl w-25 tc pv3 bg-orange white" onClick={this.setOperator}>{MINUS_OPERATOR}</div>
        </div>
        <div>
          <div className="button bb br fl w-25 tc pv3 bg-light-gray" onClick={this.concatTotal}>1</div>
          <div className="button bb br fl w-25 tc pv3 bg-light-gray" onClick={this.concatTotal}>2</div>
          <div className="button bb br fl w-25 tc pv3 bg-light-gray" onClick={this.concatTotal}>3</div>
          <div className="button operator bb br b--black fl w-25 tc pv3 bg-orange white" onClick={this.setOperator}>{ADD_OPERATOR}</div>
        </div>
        <div>
          <div className="button bb br fl w-50 tl pv3 bg-light-gray pl4" onClick={this.concatTotal}>0</div>
          <div className="button bb br fl w-25 tc pv3 bg-light-gray" onClick={this.concatTotal}>{DECIMAL_SIGN}</div>
          <div className="button operator bb br b--black fl w-25 tc pv3 bg-orange white" onClick={this.evaluateEquation}>{EQUAL_OPERATOR}</div>
        </div>
      </div>
    );
  }
}

export default App;
