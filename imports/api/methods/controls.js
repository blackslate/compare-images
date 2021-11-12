/**
 * /imports/api/methods/controls.js
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
      group_id:           _strSchema
    , visualization: { type: String }
    }).validate(setVisualizationData)
  }

, run(setVisualizationData) {
    const { group_id: _id, visualization } = setVisualizationData
    const select = { _id }
    const update = { $set: { visualization }}
    Groups.update(select, update)

    console.log
  }
}



export const shareLockAdjust = {
  name: "controls.shareLockAdjust"

, call(shareLockAdjustData, callback) {
    const options = {
      returnStubValue: true
    , throwStubExceptions: true
    }

    Meteor.apply(this.name, [shareLockAdjustData], options, callback)
  }

, validate(shareLockAdjustData) {
    const _strSchema = new SimpleSchema({
     _str: String,
    });

    new SimpleSchema({
      group_id: _strSchema
    , adjust:   { type: Boolean }
    }).validate(shareLockAdjustData)
  }

, run(shareLockAdjustData) {
    const { group_id: _id, adjust } = shareLockAdjustData
    const select = { _id }
    const update = { $set: { adjust }}
    Groups.update(select, update)

    console.log
  }
}



const methods = [
  setVisualization
, shareLockAdjust
]


methods.forEach(method => {
  Meteor.methods({
    [method.name]: function (args) {
      method.validate.call(this, args)
      return method.run.call(this, args)
    }
  })
})