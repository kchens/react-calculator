import React, { Component } from 'react';
import './App.css';

const TOTAL_ID = 'total'

const AC_TEXT = 'AC'
const DECIMAL_SIGN = '.'
const POS_NEG_SIGN = '+/-'
const NEG_SIGN = '-'
const PERCENT_SIGN = '%'

function parseInt10(targetText) {
  const radix = 10
  return parseInt(targetText, radix)
}

function handleAllClickEvensts(e) {
  const currentTotal = document.getElementById(TOTAL_ID).innerText
  const targetValue = e.target.innerText
  let newTotal
  let hasHitPercent = document.getElementById('hasHitPercent').innerText

  if (currentTotal.indexOf(DECIMAL_SIGN) > -1 && targetValue === DECIMAL_SIGN) {
    return
  }

  // e.target.className.indexOf('w-25')

  if (!isNaN(parseInt10(targetValue)) || targetValue === DECIMAL_SIGN) {
    if (currentTotal === '0' || currentTotal === '-0' || hasHitPercent === 'true') {
      document.getElementById('hasHitPercent').innerHTML = 'false'
      return document.getElementById(TOTAL_ID).innerHTML = targetValue
    } else {
      return document.getElementById(TOTAL_ID).innerHTML = currentTotal.concat(targetValue)
    }
  } else {

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
        // must: if percent_sign has been hit once, then must clear on next number. need state? hidden tag?

        if (hasHitPercent === 'false') {
          hasHitPercent = 'true'
          document.getElementById('hasHitPercent').innerHTML = hasHitPercent
        }

        newTotal = currentTotal / 100
        break
      default:
        newTotal = currentTotal
    }
  }
  document.getElementById(TOTAL_ID).innerHTML = newTotal
}

class App extends Component {
  render() {
    return (
      <div className="w-50" onClick={handleAllClickEvensts}>
        <div id={TOTAL_ID} className="white bg-black tr">0</div>
        <div id="hasHitPercent" hidden>false</div>
        <div>
          <div className="fl w-25 tc bg-light-silver">{AC_TEXT}</div>
          <div className="fl w-25 tc bg-light-silver">{POS_NEG_SIGN}</div>
          <div className="fl w-25 tc bg-light-silver">%</div>
          <div className="fl w-25 tc bg-orange white">÷</div>
        </div>
        <div>
          <div className="fl w-25 tc bg-light-gray">7</div>
          <div className="fl w-25 tc bg-light-gray">8</div>
          <div className="fl w-25 tc bg-light-gray">9</div>
          <div className="fl w-25 tc bg-orange white">x</div>
        </div>
        <div>
          <div className="fl w-25 tc bg-light-gray">4</div>
          <div className="fl w-25 tc bg-light-gray">5</div>
          <div className="fl w-25 tc bg-light-gray">6</div>
          <div className="fl w-25 tc bg-orange white">-</div>
        </div>
        <div>
          <div className="fl w-25 tc bg-light-gray">1</div>
          <div className="fl w-25 tc bg-light-gray">2</div>
          <div className="fl w-25 tc bg-light-gray">3</div>
          <div className="fl w-25 tc bg-orange white">+</div>
        </div>
        <div>
          <div className="fl w-50 tl bg-light-gray pl4">0</div>
          <div className="fl w-25 tc bg-light-gray">{DECIMAL_SIGN}</div>
          <div className="fl w-25 tc bg-orange white">=</div>
        </div>
      </div>
    );
  }
}

export default App;
