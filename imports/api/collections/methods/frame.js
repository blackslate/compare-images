/**
 * /imports/api/collections/methods/frame.js
 */

import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

import collections from '/imports/api/collections/publisher'
const { Paintings } = collections



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


const methods = [
  getPaintings
]


methods.forEach(method => {
  Meteor.methods({
    [method.name]: function (args) {
      method.validate.call(this, args)
      return method.run.call(this, args)
    }
  })
})