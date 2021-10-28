/**
 * imports/components/frame.jsx
 */


import React from 'react';
import styled from 'styled-components'


const StyledFrame = styled.div`
`


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

  const { name, copies, title } = props
  const original = `${name}/original.jpg`
  const copy = `${name}/copy/${copies[0]}.jpg`
  const copyAlt = title + " (Dafen copy)"

  return (
    <StyledFrame
      id="frame"
    >
      <img src={original} alt={title} />
      <img src={copy} alt={copyAlt} />
    </StyledFrame>
  )
}


export default Frame