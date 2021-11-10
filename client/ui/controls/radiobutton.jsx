/**
 * /client/ui/controls/radiobutton.jsx
 */


import React from 'react';


const RadioButton = (name, text, value, checked, applySelection) => {
  /**
   * <<< QUIRKAROUND
   * Although applySelection is a pointer to a function that will be
   * used by onChange, if it is used directly as the value for onChange,
   * React officiously posts a message in the Console that no onChange
   * handler is provided. This unnecessary level of indirection is used
   * to keep React quiet.
   */
  const treatChange = (event) => {
    applySelection(event)
  }
  /* QUIRKAROUND >>> */


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
        checked={!!checked}
        onChange={treatChange}
      />
      <span>{text}</span>
    </label>
  )
}


export default RadioButton