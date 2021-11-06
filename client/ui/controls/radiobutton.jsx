/**
 * /imports/ui/components/controls/deck/radiobutton.jsx
 */


import React from 'react';


const RadioButton = (name, text, value, checked) => {
  // console.log("value:", value, "checked:", checked)
  return (
    <label
      htmlFor={value}
      key={value}
    >
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        defaultChecked={!!checked}
      />
      <span>{text}</span>
    </label>
  )
}

export default RadioButton