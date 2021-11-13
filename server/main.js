import { Meteor } from 'meteor/meteor';
import { Links } from "../imports/api/links";

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  Meteor.publish('links', function(limit) {
    return Links.find({}, {limit: limit});
  })
});
