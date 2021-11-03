/**
 * /imports/ui/components/frame/FrameTracker.js
 *
 */


 import { Session } from 'meteor/session'
 import collections from '/imports/api/collections/publisher'
 const { Paintings, Groups } = collections
 
 
 
 export default class FrameTracker{
   getProps() {
    const group = Session.get("group") // "test"

    const groupData = Groups.findOne({ group })
    const {
      _id: group_id
    , name
    , copy
    , visualization
    , centre
    } = groupData

    const props = Paintings.findOne({ name })
    props.copy = props.copies[copy]
    props.group_id = group_id
    props.centre = centre
    props.visualization = visualization

    // console.log("props:", props)

    return props
  }


}