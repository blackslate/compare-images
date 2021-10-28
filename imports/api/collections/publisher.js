/**
 * /imports/api/collections/publisher.js
 */

import { Meteor } from 'meteor/meteor'

import { collections
      , publishQueries
      } from './broker'

if (Meteor.isClient) {
window.Paintings = collections.Paintings
}

 console.log("collections", Object.keys(collections))

if (Meteor.isServer) {
  for (var name in collections) {
    const select = publishQueries[name]
    const collection = collections[name]

    //  console.log(name, select)

    name = collection._name // name.toLowerCase()

    // const count = collection.find(select).count()
    // const items = (count === 1) ? "item" : "items"
    //    console.log(
    //      `Collection ${name} (${count} ${items}). Item 1:`
    //    , collection.find(select, { limit: 1 }).fetch()
    //    )

    // The publication method is run each time a client subscribes to
    // the named collection. The subscription may be made directly or
    // through the /imports/api/methods/mint.js script

    Meteor.publish(name, function public(caller, ...more) {
      // We need to use the classic function () syntax so that we can
      // use this to access the Meteor connection and use this.user_id
   
      let items = collection.find(select) // (customSelect || select)
   
      // if (typeof caller === "string") {
        console.log(
          "Publishing", collection._name, "for", caller, ...more
        )
        // console.log(
        //   "Items 1 - 4 /"
        // , collection.find(select).count()
        // , collection.find(select, { limit: 4 }).fetch()
        // )
      // }
    
      return items
    })
  }
}


export default collections
 