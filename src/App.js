import React, { Component } from 'react';
import './App.css';

const TOTAL_ID = 'total'

const AC_TEXT = 'AC'
const DECIMAL_SIGN = '.'
const POS_NEG_SIGN = '+/-'
const NEG_SIGN = '-'
const PERCENT_SIGN = '%'

const DIVIDE_OPERATOR   = '÷'
const MULTIPLY_OPERATOR = 'x'
const MINUS_OPERATOR    = '-'
const ADD_OPERATOR      = '+'
const EQUAL_OPERATOR    = '='

function parseInt10(targetText) {
  const radix = 10
  return parseInt(targetText, radix)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasHitPercent: false,
      equation: [],
      currentTotal: '0',
    }
    this.togglePosNegSign = this.togglePosNegSign.bind(this)
    this.add = this.add.bind(this)
    this.concatTotal = this.concatTotal.bind(this)
  }

  togglePosNegSign() {
    this.setState({ currentTotal: -this.state.currentTotal })
    return
  }

  concatTotal(e) {
    const { currentTotal } = this.state
    const targetText = e.target.innerText
    let newString

    if (currentTotal.indexOf(DECIMAL_SIGN) > -1 && targetText === DECIMAL_SIGN) {
      return
    }

    if (currentTotal === '0' || currentTotal === '-0') {
      if (targetText === DECIMAL_SIGN) {
        newString = currentTotal.concat(DECIMAL_SIGN)
      }
      newString = targetText
    }
    newString = currentTotal.concat(targetText)

    this.setState({currentTotal: newString})
  }

  add(e) {
    // debugger
    // this.setState({ currentTotal: this.state.currentTotal + parseInt10(e.target.innerText)})
  }

  render() {
    return (
      <div className="w-50">
        <div id={TOTAL_ID} className="white bg-black tr">{this.state.currentTotal}</div>
        <div>
          <div className="fl w-25 tc bg-light-silver">{AC_TEXT}</div>
          <div className="fl w-25 tc bg-light-silver" onClick={this.togglePosNegSign}>{POS_NEG_SIGN}</div>
          <div className="fl w-25 tc bg-light-silver">{PERCENT_SIGN}</div>
          <div className="fl w-25 tc bg-orange white">{DIVIDE_OPERATOR}</div>
        </div>
        <div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.add} data-value={7}>7</div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>8</div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>9</div>
          <div className="fl w-25 tc bg-orange white">{MULTIPLY_OPERATOR}</div>
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
          <div className="fl w-25 tc bg-orange white" onClick={this.add}>{ADD_OPERATOR}</div>
        </div>
        <div>
          <div className="fl w-50 tl bg-light-gray pl4" onClick={this.concatTotal}>0</div>
          <div className="fl w-25 tc bg-light-gray" onClick={this.concatTotal}>{DECIMAL_SIGN}</div>
          <div className="fl w-25 tc bg-orange white">{EQUAL_OPERATOR}</div>
        </div>
      </div>
    );
  }
}

export default App;
