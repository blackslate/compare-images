/**
 * component_filename.jsx
 */


import React, { Component } from 'react';
import styled from 'styled-components'


const StyledComponent = styled.input.attrs(props => ({
  type: "text"
}))`
  background-color: #fee;
`


class ComponentName extends Component {
  constructor(props) {
    super(props)

    this.method = this.method.bind(this)
  }


  method() {

  }


  render() {
    return (
      <StyledComponent
        placeholder="replace me with something useful"
      />
    )
  }
}


export default ComponentName