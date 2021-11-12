/**
 * /client/ui/viewer/ViewerTracker.js
 *
 */


import { Session } from 'meteor/session'
import { debounce } from '/imports/tools/generic/utilities'
import collections from '/imports/api/collections/publisher'
const { Groups, Paintings } = collections


// <<< Functions to make app responsive
const FRAME_RATIO = 0.8
const BORDER_RATIO = (1 - FRAME_RATIO) / 2


const setPortAndBorderSizes = () => {
  const portWidth = document.documentElement.clientWidth
  const portHeight = document.documentElement.clientHeight
  const border = Math.min(portWidth, portHeight) * BORDER_RATIO

  Session.set("portWidth", portWidth)
  Session.set("portHeight", portHeight)
  Session.set("border", border)
}


const updatePortSize = debounce(() => {
  setPortAndBorderSizes()
})


window.onresize = updatePortSize
setPortAndBorderSizes()


function getZoomData ({ width, height }, { portWidth, portHeight }) {
  const imageRatio = width / height
  const portRatio = portWidth / portHeight

  if (imageRatio > portRatio) {
    // Use maximum width and limit height
    frameWidth = portWidth * FRAME_RATIO,
    frameHeight = frameWidth / imageRatio
  } else {
    // Use maximum height and limit width
    frameHeight = portHeight * FRAME_RATIO
    frameWidth = frameHeight * imageRatio
  }

  const fitZoom = frameWidth / width

  return {
    frameHeight
  , frameWidth
  , fitZoom
  }
}

// Functions to make app responsive >>>



export default class ViewerTracker{
  getProps() {
    const group = "test"

    const groupData = Groups.findOne({ group })
    // { "_id" : ObjectId("617eb50e435874f0cd9a9028")
    // , "name" : "revel"
    // , "copy" : 0,
    // , "group" : "test"
    // , "pilot" : 0
    // , "visualization" : "invert"
    // , "zoom_rect" : {
    //   , "left" : 0
    //   , "right" : 0
    //   , "top" : 0
    //   , "bottom" : 0
    // , }
    // , "lines" : {
    //     "left" : 0
    //   , "right" : 0
    //   , "top" : 0
    //   , "bottom" : 0
    // , }
    // , "custom_areas" : [
    //     { "name" : "right sky"
    //     , "points" : [ ]
    //     , "comment" : ""
    // ,   }
    // , ]
    // , "activeCustomArea" : -1
    // , "zoom" : 2
    // }
    
    groupData.group_id = groupData._id
    const { name, copy=0 } = groupData

    const paintingData = Paintings.findOne({ name })
    // { "artist" : "Andy Kehoe"
    // , "created" : 2011
    // , "client" : "James Newton"
    // , "copyist" : ""
    // , "copies" : [
    //     { "file" : "20211015101430.jpg"
    //     , "width" : 2608
    //     , "height" : 2632
    //     , "originX" : 0.5
    //     , "originY" : 0.5
    //     , "stretchLeft" : 0
    //     , "stretchTop" : 0
    //     , "stretchRight" : 0
    //     , "stretchBottom" : 0
    // ,   }
    // , ]
    // , "name" : "revel"
    // , "title" : "Revel in the Wild Joy"
    // , "height" : 1841
    // , "width" : 1838
    // , "anchorX" : 0.5
    // , "anchorY" : 0.5
   
    paintingData.painting_id = paintingData._id
    paintingData.copyData = paintingData.copies[copy]

    const sessionData = {
      portWidth: Session.get("portWidth")
    , portHeight: Session.get("portHeight")
    , border: Session.get("border")
    }

    const zoomData = getZoomData(paintingData, sessionData)

    const props = {
      ...paintingData
    , ...groupData
    , ...sessionData
    , ...zoomData
    }
    delete props._id

    // console.log("props:", props)

    return props
  }
}