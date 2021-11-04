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

import { setCentreLock } from '../methods.js'

import {
  StyledFrame
} from './styles'

let lastName = 0
const SIGHT_RATIO = 0.1


const Frame = (props) => {
  // console.log("props:", props)
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

  const { portSize, frameRatio, border    // Set in App.jsx / resize
        , name, title                     // Read from Paintings
        , copy                            // Read from Paintings/Groups
        , group_id, centre, visualization // Read from Groups
        } = props
  const { centreH, centreV } = centre
  const original = `${name}/original.jpg`
  const compare = `${name}/copy/${copy}`
  const copyAlt = title + " (Dafen copy)"

  const [ imageSize, setImageSize ] = useState(0)
  const [ centring, setCentring] = useState(false)
  
  let dimensions = getDimensions(imageSize)
  let sightData = getSightData(dimensions)



  function getDimensions (imageSize) {
    let width  = 10
    let height = 10

    if (!imageSize) {
      // This will only be true immediately after loading the app

    } else {
      if (imageSize.ratio > portSize.ratio) {
        // Use maximum width and limit height
        width = portSize.width * frameRatio,
        height = width / imageSize.ratio
      } else {
        // Use maximum height and limit width
        height = portSize.height * frameRatio
        width = height * imageSize.ratio
      }
    }

    return {
      height
    , width
    , border
    }
  }


  function getSightData({ width, height }) {
    const size = Math.min(width, height) * SIGHT_RATIO 
    const offset = size / 2
    const left = width * centreH - offset
    const top  = height * centreV - offset

    return {
      size
    , left
    , top
    }
  }


  if (lastName !== name) {
    getImageSize(original).then(
      result => {
        lastName = name
        setImageSize(result)
        dimensions = getDimensions(result)
      }
    ).catch(
      error => console.log(error)
    )
  }


  const startDraggingSight = (event) => {
    const target = event.target.closest("svg")
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    setCentring(true)

    let dragX
    let dragY

    // 
    let {
      left:   xMin
    , top:    yMin
    , right:  xMax
    , bottom: yMax
    } = target.parentNode.getBoundingClientRect()

    let { left, top, width, height } = target.getBoundingClientRect()
    left += scrollX
    top += scrollY

    xMin += (scrollX - width / 2)
    yMin += (scrollY - height / 2)
    xMax += (scrollX - (border * 2 + width / 2))
    yMax += (scrollY - (border * 2 + height / 2))

    // console.log("xMax - xMin:", xMax - xMin)
    // console.log("yMax - yMin:", yMax - yMin)

    const { x, y } = getPageXY(event)
    const offset = { x: left - border - x, y: top - border - y }

    const drag = (event) => {
      const { x, y } = getPageXY(event)
      dragX = Math.max(xMin, Math.min(offset.x + x, xMax))
      dragY = Math.max(yMin, Math.min(offset.y + y, yMax))
      target.style.left = dragX + "px"
      target.style.top =  dragY + "px"
    }

    const drop = () => {
      setCentring(false)
      setTrackedEvents(cancelTracking)

      setTimeout(() => {
        target.style.removeProperty("left")
        target.style.removeProperty("top")
      }, 100)

      const centreH = (dragX - xMin) / dimensions.width // (xMax - xMin)
      const centreV = (dragY - yMin) / dimensions.height // (yMax - yMin)
      const centre = {
        centreH
      , centreV
      }

      setCentreLock.call({
        _id: group_id
      , centre
      })
    }

    const cancelTracking = setTrackedEvents({ event, drag, drop })
  }


  const getFrame = () => {
    if (imageSize === 0) {
      return <div />
    }

    const copyClass = "copy "
                    + ( centring
                      ? "hide"
                      : visualization
                      )

    return (
      <StyledFrame
        id="frame"
        {...dimensions}
        {...sightData}
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
          fill="#000"
          stroke="#fff"
          drag={startDraggingSight}
        />
      </StyledFrame>
    )
  }

  const frame = getFrame()
  return frame
}


export default Frame