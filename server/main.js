import { Meteor } from 'meteor/meteor';

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  
});
