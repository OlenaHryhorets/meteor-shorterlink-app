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

// executed whenever user visits a route like "localhost:3000/abcd"
function onRoute(req, res, next) {
 
  // take the token out of the url and try to a find a matching in the Links collection
  const link = Links.findOne({ token: req.params.token });
  if (link) {
    // update record in DB with mongo modifier
    Links.update(link, { $inc: { clicks: 1 }});
    // if we find a link object then redirect the user to the ling URL
    res.writeHead(307, { 'Location': link.url })
    res.end();

  } else {
    // if we don't find a link object send the user to our normal React app
    next();
  }
}

// if route match use the onRoute handler
const middleware = ConnectRoute( function(router) {
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);
