/**
 * /imports/tools/custom/updatePortSize.js
 * 
 * Use ...
 * 
 *    import from '/imports/tools/custom/updatePortSize.js'
 * 
 * ... to create the side-effect that Session.get("portSize") will be 
 * update regularly to reflect the dimensions and aspect ratio of the
 * viewport
 */

import { Session } from 'meteor/session'

const updatePortSize = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  const ratio = width / height

  const size = {
    width
  , height
  , ratio
  }
 
  Session.set("portSize", size)
}

window.addEventListener("resize", updatePortSize, false)

updatePortSize()