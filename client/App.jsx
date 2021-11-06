import React, { useState } from 'react';
import { preloadCollections } from '/imports/tools/generic/preloadCollections.js';
import { debounce } from '/imports/tools/generic/utilities'
import Splash from './ui/splash.jsx'
import Error from './ui/error.jsx'
import Viewer from './ui/viewer/Viewer.jsx'

console.log("Viewer:", Viewer)

const FRAME_RATIO = 0.8
const BORDER_RATIO = (1 - FRAME_RATIO) / 2

const views = {
  Splash
, Error
, Viewer
}


const App = () => {
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



export default App