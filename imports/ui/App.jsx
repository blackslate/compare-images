import React, { useState } from 'react';
import { preloadCollections } from '../tools/generic/preloadCollections.js';
import { debounce } from '/imports/tools/generic/utilities'
import Splash from './components/splash.jsx'
import Error from './components/error.jsx'
import Viewer from './components/Viewer.jsx'

// console.log("Frame:", Frame)
// <<< HACK
// Use default (one and only) _id from Paintings collection until we
// have a reason and a means to add other paintings and their copies
// HACK>>>
Session.set("group", "test")
const FRAME_RATIO = 0.8
const BORDER_RATIO = (1 - FRAME_RATIO) / 2

const views = {
  Splash
, Error
, Viewer
}


export const App = () => {
  const getPortSize = () => {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const ratio = width / height

    return {
      width
    , height
    , ratio
    }
  }

  const getPortAndBorderSizes = () => {
    const portSize = getPortSize()
    const { width, height } = portSize
    const border = Math.min(width, height) * BORDER_RATIO
    // console.log("border:", border, " BORDER_RATIO:",  BORDER_RATIO)
    return {
      portSize
    , border
    }
  }

  const sizes = getPortAndBorderSizes()
  const [ view, setView ] = useState("Splash")
  const [ portSize, setPortSize] = useState(sizes.portSize)
  const [ border, setBorder ] = useState(sizes.border)

  preloadCollections.then(
    result => setView("Viewer")
  ).catch(
    error => setView("Error")
  )

  const updatePortSize = debounce(() => {
    const sizes = getPortAndBorderSizes()
    setPortSize(sizes.portSize)
    setBorder(sizes.border)
  })

  window.onresize = updatePortSize

  const View = views[view]

  return (
    <div>
      <View
        portSize={portSize}
        border={border}
        frameRatio={FRAME_RATIO}
      />
    </div>
  )
};
