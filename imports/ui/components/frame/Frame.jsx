/**
 * /imports/ui/components/frame/Frame.jsx
 *
 * This script imports the Core and Tracker classes from the deck/
 * folder, extends the classes and overwrites any methods as necessary
 * and exports the resulting component.
 */



 import { withTracker } from 'meteor/react-meteor-data'

 import Core from './deck/FrameCore'
 import Tracker from './deck/FrameTracker'
 
 
 
 const tracker = new Tracker()
 
 
 
 export default withTracker(() => {
   return tracker.getProps()
 })(Core)