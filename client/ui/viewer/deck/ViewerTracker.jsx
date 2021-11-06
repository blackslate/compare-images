/**
 * /client/ui/viewer/ViewerTracker.js
 *
 */


import { Session } from 'meteor/session'
import collections from '/imports/api/collections/publisher'
const { Groups, Paintings } = collections



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
      fitZoom: Session.get("minZoom") || 0.5
    }

    const props = { ...paintingData, ...groupData, ...sessionData }
    delete props._id

    // console.log("props:", props)

    return props
  }
}