import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

Meteor.methods({
    'links.insert': function(url) {
      console.log("attempting to save " + url);

      // Validation inside method
      // validUrl.isUri(url)
      check(url, Match.Where((url) => validUrl.isUri(url))); //will throw import { Links } from '../imports/api/links' to both sides

      // ready to save the url

      const token = Math.random().toString(36).slice(-5);
      Links.insert({ url: url, token: token, clicks: 0 });
    }
})

export const Links = new Mongo.Collection('links');
