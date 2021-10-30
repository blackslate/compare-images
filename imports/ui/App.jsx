import React, { useState } from 'react';
import { preloadCollections } from '../tools/generic/preloadCollections.js';
import { debounce } from '/imports/tools/generic/utilities'
import Splash from './components/splash.jsx'
import Error from './components/error.jsx'
import Frame from './components/frame/Frame.jsx'

// console.log("Frame:", Frame)
// <<< HACK
// Use default (one and only) _id from Paintings collection until we
// have a reason and a means to add other paintings and their copies
// HACK>>>
Session.set("name", "revel")

const views = {
  Splash
, Error
, Frame
}


export const App = () => {
  const getPortSize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
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
    const border = Math.min(width, height) / 10
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
    result => setView("Frame")
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
      />
    </div>
  )
};
