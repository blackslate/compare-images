/**
 * /imports/ui/initialize.js
 */


import { Meteor } from 'meteor/meteor'
import { removeFrom } from '/imports/tools/generic/utilities'

import collections from '/imports/api/collections/publisher'


const STARTUP_TIMEOUT = 10000


export const preloadCollections = new Promise((resolve, reject) => {
  // console.log("importing")
  const unReady = []
  let timeOut = -1 // set to positive integer at end of function

  const runDebugTest = () => {
    const Paintings = collections.Paintings
    const painting = Paintings.findOne({created: 2011})
    const _id = "617a8023a674a75b1c657b5d"
    const success = painting._id = _id
    console.log("painting:", painting, success.toString() === "617a8023a674a75b1c657b5d")

    const wrapped = new Mongo.Collection.ObjectID(_id)
    const selector = { wrapped }
    const doublecheck = Paintings.findOne(selector)
    console.log("doublecheck:", wrapped, selector, doublecheck)
  }

  const ready = (collectionName) => {
    removeFrom(unReady, collectionName)

    // console.log("Collection is ready:", collectionName)

    if (!unReady.length) {
      if (timeOut) {
        // Leave this.timeOut as a non-zero value
        clearTimeout(timeOut)

        runDebugTest()

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
 