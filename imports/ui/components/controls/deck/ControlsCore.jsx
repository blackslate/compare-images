/**
 * component_filename.jsx
 */


import React, { Component } from 'react';

import Visualization from './visualization.jsx'



const Controls = (props) => {
  
  // console.log("ControlsCore props:", props)
  //
  // // Unnecessary
  // _id: Object { _str: "617eb50e435874f0cd9a9028" }
  //
  // // Global
  // border:    48
  // frameRatio: 0.9
  // portSize:  { width: 1280, height: 960, ratio: 1.33 }
  //
  // // Group
  //  activeCustomArea: -1
  //  copy: ""
  //  custom_areas: [ ... ]
  //  group: "test"
  //  lines: { left: 0, right: 0, top: 0, bottom: 0 }
  //  name: "revel"
  //  pilot: 0
  //  visualization: "invert"
  //  zoom_rect: { left: 0, right: 0, top: 0, bottom: 0 }

  return (
    <div
      id="controls"
    >
      <Visualization
        {...props}
      />
    </div>
  )
}


export default Controls