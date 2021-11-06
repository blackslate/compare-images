/**
 * /import/ui/compontents/frame/deck/styles.jsx
 */

import { Session } from 'meteor/session';
import styled from 'styled-components'



export const StyledFrame = styled.div`
  position: relative;
  ${props => `
    width: ${props.frameWidth}px;
    height: ${props.frameHeight}px;
    border: ${props.border}px solid black;
    overflow: auto;
  `}

  & img.original {
    width: ${props => props.frameWidth}px;
    height: ${props => props.frameHeight}px;
  }

  & img.copy {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  & img.copy.hide {
    display: none;
  }

  & img.copy.see-through {
    opacity: 0.5;
  }

  & img.copy.invert {
    mix-blend-mode: difference;
  }

  & img.copy.fade {
    /* TODO */
  }

  & svg {
    position: absolute;
    mix-blend-mode: difference;
    ${props => ` 
      left: ${props.left}px;
      top: ${props.top}px;
      width: ${props.size}px;
      height: ${props.size}px;
    `}
  }
`