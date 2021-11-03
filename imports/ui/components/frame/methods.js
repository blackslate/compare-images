/**
 * /imports/api/collections/methods/frame.js
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



export const setCentreLock = {
  name: "frame.setCentreLock"

, call(centreLockData, callback) {
    const options = {
      returnStubValue: true
    , throwStubExceptions: true
    }

    Meteor.apply(this.name, [centreLockData], options, callback)
  }

, validate(centreLockData) {
    const centreSchema = new SimpleSchema({
      centreH: Number
    , centreV: Number
    })

    const _strSchema = new SimpleSchema({
     _str: String,
    });

    new SimpleSchema({
     _id:    _strSchema
   , centre: centreSchema
    }).validate(centreLockData)
  }

, run(centreLockData) {
    const { _id, centre } = centreLockData
    const select = { _id }
    const update = { $set: { centre }}

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
, setCentreLock
]


methods.forEach(method => {
  Meteor.methods({
    [method.name]: function (args) {
      method.validate.call(this, args)
      return method.run.call(this, args)
    }
  })
})