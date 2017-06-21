import React from 'react';
import './button.css';

const CLASS_NAMES = {
  "topBar": "button bb br fl w-25 tc pv3 bg-light-silver",
  "rightBar": "button operator bb br b--black fl w-25 tc pv3 bg-orange white",
  "generic": "button bb br fl w-25 tc pv3 bg-light-gray",
}

const Button = ({buttonType, onClick, text}) => {
  return <div className={CLASS_NAMES[buttonType]} onClick={onClick}>{text}</div>
}

export default Button