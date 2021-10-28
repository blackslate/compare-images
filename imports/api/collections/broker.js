/**
 * This script creates a MongoDB collection named after each of the
 * folders found at '/public/collections/'.
 *
 * The collections and publish queries exported here are
 * imported by './publisher.js', which publishes them all.
 */



 import { Mongo } from 'meteor/mongo';
 
 
 const Paintings = new Mongo.Collection('paintings')
 
 
 export const collections = {
   Paintings
 }
 
 
 export const publishQueries = {
  "Paintings": {}
 }