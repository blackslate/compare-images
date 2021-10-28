/**
 * imports/components/frame.jsx
 */


import React, { useState } from 'react';
import { Session } from 'meteor/session';
import { getImageSize } from '/imports/tools/generic/utilities'


import {
  StyledFrame
} from './styles'

let lastImageSize = {ratio: 0}

const Frame = (props) => {
  // console.log("FrameCore props:", props)
  // { _id:    Object { _str: "617a8023a674a75b1c657b5d" }
  // , artist: "Andy Kehoe"
  // , client: "James Newton"
  // , copies:  Array [ "20211015101430" ]
  // , copyist: ""
  // , created: 2011
  // , name:    "revel"
  // , title:   "Revel in the Wild Joy"
  // }

  const { name, copies, title, portSize } = props
  const original = `${name}/original.jpg`
  const copy = `${name}/copy/${copies[0]}.jpg`
  const copyAlt = title + " (Dafen copy)"

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


  const getFrame = () => {
    if (imageSize === 0) {
      return <div />

    } else {
      return (
        <StyledFrame
          id="frame"
          imageSize={imageSize}
          portSize={portSize}
        >
          <img
            className="original"
            src={original}
            alt={title}
          />
          <img
            className="copy"
            src={copy}
            alt={copyAlt}
          />
          <div className="ring" />
        </StyledFrame>
      )
    }
  }

  const frame = getFrame()
  return frame
}


export default Frame