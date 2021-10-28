/**
 * /imports/ui/components/frame/FrameTracker.js
 *
 */


 import { Session } from 'meteor/session'
 import collections from '/imports/api/collections/publisher'
 const { Paintings } = collections
 
 
 
 export default class FrameTracker{
   getProps() {
    const name = Session.get("name")
    // const _id = Session.get("work")
    // const _id = Session.get("artist")
    // const _id = Session.get("client")
    // const _id = Session.get("copyist")
    // const _id = Session.get("copies")

    // console.log("name:", name)
    const props = Paintings.findOne({ name })
    // console.log("props:", props)

    // const props = {
    // _id
    // , work
    // , artist
    // , client
    // , copyist
    // , copies
    // }

    // console.log("props:", props)

    return props
  }


}