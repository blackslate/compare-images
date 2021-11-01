/**
 * /imports/api/methods/broker.js
 *
 * This script gathers together details of all the methods founcd
 * in the `imports/ui/components/controls/` folders.
 *
 * The methods exported here are imported by '/server/main.js'
 * and various client-side scripts.
 */

import * as controls from '/imports/ui/components/controls/methods.js'

export const methods = {
  ...controls
}
