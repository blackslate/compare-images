/**
 * /client/ui/components/frame/methods.js
 */

import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

import collections from '/imports/api/collections/publisher'
const { Paintings, Groups } = collections



export const getPaintings = {
  name: "frame.getPaintings"

, call(paintingData, callback) {
    const options = {
      returnStubValue: true
    , throwStubExceptions: true
    }

    Meteor.apply(this.name, [paintingData], options, callback)
  }

, validate(paintingData) {
    new SimpleSchema({
     _id: { type: String}
   // , work: { type: String}
   // , artist: { type: String}
   // , created: { type: Number}
   // , client: { type: String}
   // , copyist: { type: String}
   // , copies: [ String ]
    }).validate(paintingData)
  }

, run(paintingData) {
    const { _id } = paintingData
    const select = { _id }
    const result = Paintings.find(select)

    console.log( "db.paintings.find("
               + JSON.stringify(select)
               + ") >>> result:", result
               )
  }
}



export const setAnchorPoint = {
  name: "frame.setAnchorPoint"

, call(anchorPointData, callback) {
    const options = {
      returnStubValue: true
    , throwStubExceptions: true
    }

    Meteor.apply(this.name, [anchorPointData], options, callback)
  }

, validate(anchorPointData) {
    const _strSchema = new SimpleSchema({
     _str: String,
    });

    new SimpleSchema({
     _id:    _strSchema
     , anchorX: Number
     , anchorY: Number
    }).validate(anchorPointData)
  }

, run(anchorPointData) {
    const { _id, anchorX, anchorY } = anchorPointData
    const select = { _id }
    const update = { $set: { anchorX, anchorY }}

    const result = Groups.update(select, update)

    // // <<< FOR DEBUGGING
    // console.log(
    //   "db.groups.update("
    // + JSON.stringify(select) 
    // + ", "
    // + JSON.stringify(update)
    // + ")\n*** { _str: \"...\"} should be ObjectID(\"...\") ***\n"
    // + ">>> result:", result
    // )
    // // FOR DEBUGGING >>>
  }
}


const methods = [
  getPaintings
, setAnchorPoint
]


methods.forEach(method => {
  Meteor.methods({
    [method.name]: function (args) {
      method.validate.call(this, args)
      return method.run.call(this, args)
    }
  })
})