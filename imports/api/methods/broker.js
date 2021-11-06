/**
 * /imports/api/methods/broker.js
 *
 * This script gathers together details of all the methods founcd
 * in the `imports/ui/components/controls/` folders.
 *
 * The methods exported here are imported by '/server/main.js'
 * and various client-side scripts.
 */


import * as frame from './frame.js'
import * as controls from './controls.js'


export const methods = {
  ...frame
, ...controls
}

