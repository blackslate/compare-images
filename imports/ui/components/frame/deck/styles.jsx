/**
 * /import/ui/compontents/frame/deck/styles.jsx
 */

import { Session } from 'meteor/session';
import styled from 'styled-components'

const getFrameRect = (imageSize, portSize) => {
  if (!imageSize) {
    return ""
  }

  let width
    , height

  if (imageSize.ratio > portSize.ratio) {
    // Use maximum width and limit height
    width = portSize.width * 0.8
    height = width / imageSize.ratio
  } else {
    // Use maximum height and limit width
    height = portSize.height * 0.8
    width = height * imageSize.ratio
  }

  return `height: ${height}px;width: ${width}px;`
}


export const StyledFrame = styled.div`
  position: relative;
  ${props => getFrameRect(props.imageSize, props.portSize)}
  border: 10vmin solid black;

  & img.original {
    width: 100%;
  }

  & img.copy {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0.5;
  }
`