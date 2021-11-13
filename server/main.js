import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/api/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  Meteor.publish('links', function(limit) {
    return Links.find({}, {limit: limit});
  })
});

const middleware = ConnectRoute(function(router) {
  router.get('/:token', (req) => console.log(req));
})

WebApp.connectHandlers.use(middleware);
