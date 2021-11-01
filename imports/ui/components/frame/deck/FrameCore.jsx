/**
 * imports/components/frame.jsx
 */


import React, { useState } from 'react';
import {
  getImageSize
, setTrackedEvents
, getPageXY
} from '/imports/tools/generic/utilities'
import Sight from './sight'

import {
  StyledFrame
} from './styles'

let lastImageSize = {ratio: 0}


const Frame = (props) => {
  // console.log("FrameCore props:", props)
  // { _id:     Object { _str: "617a8023a674a75b1c657b5d" }
  // , artist:  "Andy Kehoe"
  // , client:  "James Newton"
  // , copies:  [ "20211015101430.jpg" ]
  // , copyist: ""
  // , created: 2011
  // , name:    "revel"
  // , title:   "Revel in the Wild Joy"
  //
  // , border: 57
  // , frameRatio: 0.9
  // , portSize: { width: 1000, height: 800, ratio: 1.25}
  // ,
  // , copy: "20211015101430.jpg"
  // , visualization: "invert"
  // }

  const { name, title
        , portSize, frameRatio, border
        , copy
        , visualization
        } = props
  const original = `${name}/original.jpg`
  const compare = `${name}/copy/${copy}`
  const copyAlt = title + " (Dafen copy)"
  const copyClass = "copy " + visualization

  const [ imageSize, setImageSize ] = useState(0)

  getImageSize(original).then(
    result => {
      if (result.ratio !== lastImageSize.ratio) {
        lastImageSize = result
        setImageSize(result)
      }
    }
  ).catch(
    error => console.log(error)
  )


  const startDraggingSight = (event) => {
    const target = event.target.closest("svg")
    const { left, top } = target.getBoundingClientRect()

    const { x, y } = getPageXY(event)
    const offset = { x: left - border - x, y: top - border - y }

    const drop = () => {
      setTrackedEvents(cancelTracking)
      console.log("dropped");
    }

    const drag = (event) => {
      const { x, y } = getPageXY(event)
      target.style.left = ( offset.x + x ) + "px"
      target.style.top =  ( offset.y + y ) + "px"
    }

    const cancelTracking = setTrackedEvents({ event, drag, drop })
  }


  const getFrame = () => {
    if (imageSize === 0) {
      return <div />

    } else {
      return (
        <StyledFrame
          id="frame"
          imageSize={imageSize}
          portSize={portSize}
          frameRatio={frameRatio}
          border={border}
        >
          <img
            className="original"
            src={original}
            alt={title}
          />
          <img
            className={copyClass}
            src={compare}
            alt={copyAlt}
          />
          <Sight
            className="sight"
            fill="#c0f"
            drag={startDraggingSight}
          />
        </StyledFrame>
      )
    }
  }

  const frame = getFrame()
  return frame
}


export default Frame