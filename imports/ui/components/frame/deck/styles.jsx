/**
 * /import/ui/compontents/frame/deck/styles.jsx
 */

import { Session } from 'meteor/session';
import styled from 'styled-components'



export const StyledFrame = styled.div`
  position: relative;
  ${props => `
    width: ${props.width}px;
    height: ${props.height}px;
    border: ${props.border}px solid black;
  `}

  & img.original {
    width: 100%;
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
    ${props => ` 
      left: ${props.centreX}px;
      top: ${props.centreY}px;
      width: ${props.centreSize}px;
      height: ${props.centreSize}px;
    `}
  }
`