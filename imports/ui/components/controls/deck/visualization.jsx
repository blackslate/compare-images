/**
 * imports/ui/components/controls/visualisation.jsx
 */

/**
 * component_filename.jsx
 */


import React, { Component } from 'react';
import styled from 'styled-components'
import { setVisualization } from '../methods';


const StyledVisualization = styled.fieldset`
  background-color: #000;
  color: #fff;

  & label {
    display: block;
  }
`

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


const Visualization = ({ _id, visualization }) => {
  const applySelection = (event) => {
    const visualization = event.target.value
    setVisualization.call({ _id, visualization })
  }

  const getRadioSet = () => {
    buttons = [
      { text: "Hide copy", value: "hide" }
    , { text: "See-through copy", value: "see-through" }
    , { text: "Invert copy", value: "invert" }
    , { text: "Fade copy in and out", value: "fade" }
    , { text: "Show copy", value: "show" }
    ].map( buttonData => {
      const { text, value } = buttonData
      const checked = value === visualization
      const name = "visualization"

      return RadioButton(name, text, value, checked)
    })

    return buttons
  }

  const radioSet = getRadioSet()

  return (
    <StyledVisualization
      onChange={applySelection}
    >
      {radioSet}
    </StyledVisualization>
  )
}


export default Visualization