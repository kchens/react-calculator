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
      currentTotal: 0,
    }
    this.handleAllClickEvents = this.handleAllClickEvents.bind(this)
    this.togglePosNegSign = this.togglePosNegSign.bind(this)
  }

  togglePosNegSign() {

  }

  handleAllClickEvents(e) {
    const currentTotal = document.getElementById(TOTAL_ID).innerText
    const targetValue = e.target.innerText
    let equation = [currentTotal]
    let newTotal

    if (currentTotal.indexOf(DECIMAL_SIGN) > -1 && targetValue === DECIMAL_SIGN) {
      return
    }

    // e.target.className.indexOf('w-25')
    debugger
    if (!isNaN(parseInt10(targetValue)) || targetValue === DECIMAL_SIGN) {
      if (currentTotal === '0' || currentTotal === '-0' || this.state.hasHitPercent === false) {
        // this.setState( (prevState, props) => {return { hasHitPercent: false } })

        this.setState({
          hasHitPercent: true
        })
        newTotal = targetValue
      } else {
        newTotal = currentTotal.concat(targetValue)
      }
      return document.getElementById(TOTAL_ID).innerHTML = newTotal
    }

    switch (targetValue) {
      case AC_TEXT:
        newTotal = "0"
        break
      case POS_NEG_SIGN:
        if (currentTotal[0] === NEG_SIGN) {
          newTotal = currentTotal.substring(1, currentTotal.length)
        } else {
          newTotal = NEG_SIGN.concat(currentTotal)
        }
        break
      case PERCENT_SIGN:
        // stretch: if there is an 'e', then display at most 5 decimal points
        if (this.state.hasHitPercent === false) {
          this.setState( { hasHitPercent: true } )
        }
        newTotal = currentTotal / 100

        break
      case DIVIDE_OPERATOR:
        // document.getElementById(TOTAL_ID).innerHTML = currentTotal.concat()
        break
      case MULTIPLY_OPERATOR:
        break
      case MINUS_OPERATOR:
        break
      case ADD_OPERATOR:
        equation.push(ADD_OPERATOR)
        newTotal = currentTotal
        break
      case EQUAL_OPERATOR:
        newTotal = eval(equation.join(''))
        break
      default:
        newTotal = currentTotal
    }
    debugger
    return document.getElementById(TOTAL_ID).innerHTML = newTotal
  }

  render() {
    return (
      <div className="w-50" onClick={this.handleAllClickEvents}>
        <div id={TOTAL_ID} className="white bg-black tr">0</div>
        <div id="operator" hidden>false</div>
        <div>
          <div className="fl w-25 tc bg-light-silver">{AC_TEXT}</div>
          <div className="fl w-25 tc bg-light-silver">{POS_NEG_SIGN}</div>
          <div className="fl w-25 tc bg-light-silver">{PERCENT_SIGN}</div>
          <div className="fl w-25 tc bg-orange white">{DIVIDE_OPERATOR}</div>
        </div>
        <div>
          <div className="fl w-25 tc bg-light-gray">7</div>
          <div className="fl w-25 tc bg-light-gray">8</div>
          <div className="fl w-25 tc bg-light-gray">9</div>
          <div className="fl w-25 tc bg-orange white">{MULTIPLY_OPERATOR}</div>
        </div>
        <div>
          <div className="fl w-25 tc bg-light-gray">4</div>
          <div className="fl w-25 tc bg-light-gray">5</div>
          <div className="fl w-25 tc bg-light-gray">6</div>
          <div className="fl w-25 tc bg-orange white">{MINUS_OPERATOR}</div>
        </div>
        <div>
          <div className="fl w-25 tc bg-light-gray">1</div>
          <div className="fl w-25 tc bg-light-gray">2</div>
          <div className="fl w-25 tc bg-light-gray">3</div>
          <div className="fl w-25 tc bg-orange white">{ADD_OPERATOR}</div>
        </div>
        <div>
          <div className="fl w-50 tl bg-light-gray pl4">0</div>
          <div className="fl w-25 tc bg-light-gray">{DECIMAL_SIGN}</div>
          <div className="fl w-25 tc bg-orange white">{EQUAL_OPERATOR}</div>
        </div>
      </div>
    );
  }
}

export default App;
