/**
 * /imports/ui/components/controls/deck/ControlsTracker.js
 *
 */


 import { Session } from 'meteor/session'
 import collections from '/imports/api/collections/publisher'
 const { Groups } = collections
 
 
 
 export default class ControlsTracker{
   getProps() {
    const group = Session.get("group") // "test"
    const props = Groups.findOne({ group })

    // console.log("Controls props:", props)

    return props
  }
}