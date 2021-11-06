/**
 * client/ui/Viewer.jsx
 */


import React, { Component } from 'react';

import Frame from '../../frame/Frame.jsx'
import Controls from '../../controls/Controls.jsx'
import styled from 'styled-components'


const StyledViewer = styled.div`
  background-color: #fee;
`


const Viewer = (props) => {
  return (
    <StyledViewer     
      id="viewer"
    >
      <Frame 
        {...props}
      />
      <Controls 
        {...props}
      />
    </StyledViewer>
  )
}


export default Viewer