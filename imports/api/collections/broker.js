/**
 * The collections and publish queries exported here are
 * imported by './publisher.js', which publishes them all.
 */



import { Mongo } from 'meteor/mongo';


const Paintings = new Mongo.Collection('paintings')
const Groups = new Mongo.Collection('groups')


export const collections = {
  Paintings
, Groups
}


export const publishQueries = {
  "Paintings": {}
, "Groups": {}
}