/**
 * imports/components/frame.jsx
 */


import React, { useState } from 'react';
import {
  setTrackedEvents
, getPageXY
} from '/imports/tools/generic/utilities'
import Sight from './sight'

import { setAnchorPoint } from '/imports/api/methods/frame.js'

import {
  StyledFrame
} from './styles'

let lastName = 0
const SIGHT_RATIO = 0.1


const Frame = (props) => {
  // console.log("Frame props:", props)

  // { activeCustomArea: -1
  // , adjust: true
  // , anchorX: 0.5
  // , anchorY: 0.5
  // , artist: "Andy Kehoe"
  // , border: 78.49999999999999
  // , client: "James Newton"
  // , copies: [
  //     { file: "20211015101430.jpg"
  //     , height:  2632
  //     , width:   2608
  //     , originX: 0.5
  //     , originY: 0.5
  //     , stretchBottom: 0
  //     , stretchLeft:   0
  //     , stretchRight:  0
  //     , stretchTop:    0
  //     }
  //   ]
  // , copy: 0
  // , copyData: {
  //     file: "20211015101430.jpg"
  //   , height:  2632
  //   , width:   2608
  //   , originX: 0.5
  //   , originY: 0.5
  //   , stretchBottom: 0
  //   , stretchLeft:   0
  //   , stretchRight:  0
  //   , stretchTop:    0
  //   }
  // , copyist: ""
  // , created: 2011
  // , custom_areas: [{…}]
  // , fitZoom: 0.32818280739934713
  // , frameHeight: 604.1845484221981
  // , frameWidth: 603.2
  // , group: "test"
  // , group_id: ObjectID {_str: '617eb50e435874f0cd9a9028'}
  // , height: 1841
  // , lines: {left: 0, right: 0, top: 0, bottom: 0}
  // , name: "revel"
  // , painting_id: ObjectID {_str: '617a8023a674a75b1c657b5d'}
  // , pilot: 0
  // , portWidth: 785
  // , portHeight: 862
  // , title: "Revel in the Wild Joy"
  // , visualization: "invert"
  // , width: 1838
  // , zoom: 2
  // , zoom_rect: {left: 0, right: 0, top: 0, bottom: 0}
  // }

  const { border, frameWidth, frameHeight      //
        , name, title, width, height, copyData // Read from Paintings
        , group_id                             // Read from Groups
        , anchorX, anchorY, zoom, fitZoom
        , visualization, adjust
        } = props

  const original = `${name}/original.jpg`
  const compare = `${name}/copy/${copyData.file}`
  const copyAlt = title + " (Dafen copy)"

  const [ centring, setCentring] = useState(false)
  const [ scroll, setScroll ] = useState({ x: 0, y: 0 })


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

      const anchorX = (dragX - xMin) / frameWidth
      const anchorY = (dragY - yMin) / frameHeight

      setAnchorPoint.call({
        _id: group_id
      , anchorX
      , anchorY
      })
    }

    const cancelTracking = setTrackedEvents({ event, drag, drop })
  }


  function getSightData() {
    if (!adjust) {
      return {}
    }

    const size = Math.min(frameWidth, frameHeight) * SIGHT_RATIO
    const offset = size / 2
    const left = frameWidth * anchorX - offset
    const top  = frameHeight * anchorY - offset
    const sight = (
      <Sight
        className="sight"
        fill="#000"
        stroke="#fff"
        drag={startDraggingSight}
      />
    )

    return {
      sight
    , size
    , left
    , top
    }
  }


  const getFrame = () => {
    const copyClass = "copy "
                    + ( centring
                      ? "hide"
                      : visualization
                      )
    let { sight,  ...sightData } = getSightData()


    return (
      <StyledFrame
        id="frame"
        {...sightData}
        frameHeight={frameHeight}
        frameWidth={frameWidth}
        border={border}
        fitZoom={fitZoom}
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
        {sight}
      </StyledFrame>
    )
  }

  const frame = getFrame()
  return frame
}


export default Frame