/**
 * client/ui/controls/visualisation.jsx
 */


import React, { Component } from 'react';
import styled from 'styled-components'
import RadioButton from './radiobutton'

// import methods from '/imports/api/methods/broker.js';
// const { setVisualization } = methods.methods
import { setVisualization } from '/imports/api/methods/controls';



const StyledVisualization = styled.fieldset`
  background-color: #000;
  color: #fff;

  & label {
    display: block;
  }
`



const Visualization = ({ group_id, visualization }) => {

  const applySelection = (event) => {
    const visualization = event.target.value
    setVisualization.call({ group_id, visualization })
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
      const checked = (value === visualization)
      const name = "visualization"

      return RadioButton(name, text, value, checked, applySelection)
    })

    return buttons
  }


  const radioSet = getRadioSet()

  
  return (
    <StyledVisualization>
      {radioSet}
    </StyledVisualization>
  )
}



export default Visualization