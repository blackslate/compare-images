/**
 * /imports/tools/preloadCollections.js
 */


import { Meteor } from 'meteor/meteor'
import { removeFrom } from '/imports/tools/generic/utilities'

import collections from '/imports/api/collections/publisher'


const STARTUP_TIMEOUT = 10000


export const preloadCollections = new Promise((resolve, reject) => {
  // console.log("importing")
  const unReady = []
  let timeOut = -1 // set to positive integer at end of function

    const ready = (collectionName) => {
    removeFrom(unReady, collectionName)

    // console.log("Collection is ready:", collectionName)

    if (!unReady.length) {
      if (timeOut) {
        // Leave this.timeOut as a non-zero value
        clearTimeout(timeOut)
        resolve()
      }
    }
  }


  const treatError = (collectionName, error) => {
    if (unReady.length) {
      // ignore any subsequent errors
      unReady.length = 0

      // console.log("Error subscribing to", collectionName, ": ",error)
      reject(`Subscription error for ${collectionName}`)
    }
  }


  const connectionTimedOut = () => {
    // console.log("connectionTimedOut")
    timeOut = 0 // this.prepareConnection will not run now
    reject("TimeOut") // reason is not used
  }


  const connectToMongoDB = () => {
    for (let collectionName in collections) {
      unReady.push(collectionName)

      const collection = collections[collectionName]
      // We can send (multiple) argument(s) to the server publisher
      // for debugging purposes
      // console.log("Subscribing to", collection._name)

      const name = collection._name
      const callbacks = {
        onReady: () => ready(collectionName)
      , onStop: (reason) => treatError(collectionName, reason)
      }

      const handle = Meteor.subscribe(name, callbacks)
    }
  }


  timeOut = setTimeout(connectionTimedOut, STARTUP_TIMEOUT)
  // console.log("PreloadCollections timeout", timeOut)
  connectToMongoDB()
})
 