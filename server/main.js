import { Meteor } from 'meteor/meteor';
import { Links } from "../imports/api/links";
import {WebApp } from 'meteor/webapp';

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  Meteor.publish('links', function(limit) {
    return Links.find({}, {limit: limit});
  })
});

WebApp.connectHandlers.use(req => console.log(req));
