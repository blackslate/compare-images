/**
 * imports/ui/components/controls/deck/adjustment.jsx
 * 
 * Radio buttons for Move or Stretch
 * Slider for Zoom
 * Selection of selected areas
 */


import { Session } from 'meteor/session'
import React, { useState } from 'react';
import styled from 'styled-components'
import RadioButton from './radiobutton'
import { shareZoom, shareScroll } from '/imports/api/methods/broker.js';


// console.log("Session:", Session)


const StyledAdjustment = styled.fieldset`
  background-color: #000;
  color: #fff;

  & label {
    display: block;
  }
`


const Adjustment = ({ _id, centre, zoom, fitZoom, adjust }) => {
  const minZoom = Math.min(fitZoom, 1)
  const step = 0.05
  const notch = 10
  const tweak = step * notch
  // const [ scale, setScale ] = useState(zoom)

  const updateZoom = (event) => {
    const slider = event.target
    let zoom = Math.max(slider.value, minZoom)

    if (fitZoom > 1) {
       // The orginal image is smaller than the frame. Create a notch
       // where the image is zoomed to fit the frame exactly
      if ( zoom >= fitZoom ) {
        zoom = Math.max(fitZoom, zoom - tweak)
        if (zoom === fitZoom) {
          slider.value = zoom + tweak / 2
        }      
      }
    } else if (zoom > 1) {
      zoom = zoom = Math.max(1, zoom - tweak)
      if (zoom === 1) {
        slider.value = 1 + tweak / 2
      }
    }

    // Refresh zoom locally, but not for other group members
    Session.set("zoomPreview", zoom)

    // HACK: calculation and display duplicated in Zoom() below
    const percentage = Math.round(zoom * 100) + "%";
    slider.nextSibling.innerText = percentage // <span>
  }


  const shareZoomValue = (event) => {
    // setScale(zoomValue)
  }


  const Zoom = ({ min, zoom }) => {
    // HACK: calculation duplicated in updateZoom() above
    const percentage = Math.round(zoom * 100) + "%"
    min = Math.floor(min / step) * step

    // console.log("min:", min)

    return (
      <label htmlFor="zoom">
        <input
          type="range"
          id="zoom"
          name="zoom"
          min={min}
          max={4 + tweak}
          step={step}
          defaultValue={zoom || min}
          onChange={updateZoom}
          onMouseUp={shareZoomValue}
      />
      <span>{percentage}</span>
   </label>
    )
  }


  const getRadioSet = () => {
    buttons = [
      { text: "Move", value: "move" }
    , { text: "Stretch", value: "stretch" }
    ].map( buttonData => {
      const { text, value } = buttonData
      const checked = value === adjust
      const name = "adjust"

      return RadioButton(name, text, value, checked)
    })

    return buttons
  }

  const radioSet = getRadioSet()


  return (
    <StyledAdjustment>
      <Zoom
        min={minZoom}
        zoom={zoom}
      />
      {radioSet}
    </StyledAdjustment>
  )
}


export default Adjustment