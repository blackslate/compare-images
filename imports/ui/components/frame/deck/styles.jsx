/**
 * /import/ui/compontents/frame/deck/styles.jsx
 */

import { Session } from 'meteor/session';
import styled from 'styled-components'

const getFrameRect = (imageSize, portSize, frameRatio, border) => {
  if (!imageSize) {
    return ""
  }

  let width
    , height

  if (imageSize.ratio > portSize.ratio) {
    // Use maximum width and limit height
    width = portSize.width * frameRatio,
    height = width / imageSize.ratio
  } else {
    // Use maximum height and limit width
    height = portSize.height * frameRatio
    width = height * imageSize.ratio
  }

  return `
  height: ${height}px;
  width: ${width}px;
  border ${border}px solid black;`
}


export const StyledFrame = styled.div`
  position: relative;
  ${props => {
    const { imageSize, portSize, frameRatio, border } = props
    return getFrameRect(imageSize, portSize, frameRatio, border)
  }}

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
    top: 45%;
    left: 45%;
    width: 10%;
    height: 10%;
  }
`