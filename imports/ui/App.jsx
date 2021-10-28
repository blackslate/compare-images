import React, { useState } from 'react';
import { preloadCollections } from './preloadCollections.js';
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
  const [ view, setView ] = useState("Splash")

  preloadCollections.then(
    result => setView("Frame")
  ).catch(
    error => setView("Error")
  )

  const View = views[view]

  return (
    <div>
      <View />
    </div>
  )
};
