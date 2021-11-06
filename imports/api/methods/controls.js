/**
 * /imports/ui/components/controls/methods.js
 */

import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

import collections from '/imports/api/collections/publisher'
const { Groups } = collections



export const setVisualization = {
  name: "controls.setVisualisation"

, call(setVisualizationData, callback) {
    const options = {
      returnStubValue: true
    , throwStubExceptions: true
    }

    Meteor.apply(this.name, [setVisualizationData], options, callback)
  }

, validate(setVisualizationData) {
    const _strSchema = new SimpleSchema({
     _str: String,
    });

    new SimpleSchema({
      _id:           _strSchema
    , visualization: { type: String }
    }).validate(setVisualizationData)
  }

, run(setVisualizationData) {
    const { _id, visualization } = setVisualizationData
    const select = { _id }
    const update = { $set: { visualization }}
    Groups.update(select, update)

    console.log
  }
}



const methods = [
  setVisualization
]


methods.forEach(method => {
  Meteor.methods({
    [method.name]: function (args) {
      method.validate.call(this, args)
      return method.run.call(this, args)
    }
  })
})