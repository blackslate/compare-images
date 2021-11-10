import React, { useState } from 'react';
import { preloadCollections } from '/imports/tools/generic/preloadCollections.js';
import Splash from './ui/splash.jsx'
import Error from './ui/error.jsx'
import Viewer from './ui/viewer/Viewer.jsx'


const views = {
  Splash
, Error
, Viewer
}


const App = () => {
  const [ view, setView ] = useState("Splash")

  preloadCollections.then(
    () => setView("Viewer")
  ).catch(
    console.log("Error in preloadCollections:", error)
    error => setView("Error")
  )

  const View = views[view]

  return (
    <div>
      <View />
    </div>
  )
};



export default App