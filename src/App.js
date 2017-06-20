import React, { Component } from 'react';
import './App.css';

const TOTAL_ID = 'total'

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
      hasHitPercent: false,
      currentTotal: '0',
      lastTotal: '0',
      displayTotal: '0',
      operator: null,
      hasHitOperator: false,
    }
    this.togglePosNegSign = this.togglePosNegSign.bind(this)
    this.setOperator = this.setOperator.bind(this)
    this.concatTotal = this.concatTotal.bind(this)
    this.clearTotal = this.clearTotal.bind(this)
    this.makePercent = this.makePercent.bind(this)
    this.evaluateEquation = this.evaluateEquation.bind(this)
  }

  clearTotal() {
    this.setState({currentTotal: '0', displayTotal: '0'})
  }

  concatTotal(e) {
    const { currentTotal } = this.state
    const targetText = e.target.innerText
    let newString

    if (this._hasDecimal(currentTotal, targetText)) {
      return
    }

    if (currentTotal === '0' || currentTotal === '-0') {
      if (targetText === DECIMAL_SIGN) {
        newString = currentTotal.concat(DECIMAL_SIGN)
      } else {
        newString = targetText
      }
    } else {
      newString = currentTotal.concat(targetText)
    }
    this.setState({currentTotal: newString, displayTotal: newString})
  }

  togglePosNegSign() {
    const { currentTotal } = this.state
    let newString
    if (currentTotal.indexOf(NEG_SIGN) > -1) {
      newString = currentTotal.substring(1, currentTotal.length)
    } else {
      newString = NEG_SIGN.concat(currentTotal)
    }
    this.setState({ currentTotal: newString, displayTotal: newString})
  }

  makePercent() {
    let newTotal = parseFloat(this.state.currentTotal) / 100
    newTotal = "" + newTotal
    this.setState({currentTotal: newTotal, displayTotal: newTotal})
  }

  setOperator(e) {
    const { currentTotal, displayTotal } = this.state
    let newOperator
    switch (e.target.innerText) {
      case MULTIPLY_SIGN:
        newOperator = MULTIPLY_OPERATOR
      case DIVIDE_SIGN:
        newOperator = DIVIDE_OPERATOR
      default:
        newOperator = e.target.innerText
    }

    this.setState({operator: newOperator, lastTotal: displayTotal, currentTotal: '0'})
  }

  evaluateEquation() {
    const { lastTotal, currentTotal, operator } = this.state
    let newTotal
    newTotal = eval(lastTotal + operator + currentTotal)
    console.log(this.state)
    console.log(newTotal)
    this.setState({lastTotal: newTotal, displayTotal: newTotal})
  }

  _hasDecimal(currentTotal, targetText) {
    return currentTotal.indexOf(DECIMAL_SIGN) > -1 && targetText === DECIMAL_SIGN
  }

  render() {
    return (
      <div className="w-50">
        <div id={TOTAL_ID} className="white bg-black tr">{this.state.displayTotal}</div>
        <div>
          <div className="fl w-25 tc bg-light-silver" onClick={this.clearTotal}>{AC_TEXT}</div>
          <div className="fl w-25 tc bg-light-silver" onClick={this.togglePosNegSign}>{POS_NEG_SIGN}</div>
          <div className="fl w-25 tc bg-light-silver" onClick={this.makePercent}>{PERCENT_SIGN}</div>
          <div className="fl w-25 tc bg-orange white">{DIVIDE_SIGN}</div>
        </div>
        <div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>7</div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>8</div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>9</div>
          <div className="fl w-25 tc bg-orange white">{MULTIPLY_SIGN}</div>
        </div>
        <div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>4</div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>5</div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>6</div>
          <div className="fl w-25 tc bg-orange white">{MINUS_OPERATOR}</div>
        </div>
        <div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>1</div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>2</div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>3</div>
          <div className="fl w-25 tc bg-orange white" onClick={this.setOperator}>{ADD_OPERATOR}</div>
        </div>
        <div>
          <div className="fl w-50 tl bg-light-gray pl4" onClick={this.concatTotal}>0</div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>{DECIMAL_SIGN}</div>
          <div className="fl w-25 tc bg-orange white" onClick={this.evaluateEquation}>{EQUAL_OPERATOR}</div>
        </div>
      </div>
    );
  }
}

export default App;
