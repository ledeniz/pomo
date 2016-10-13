var jsdom = require('jsdom').jsdom;

function Notification(title, body) {
  this.close = function() {}
}

global.document = jsdom('');
global.window = document.defaultView;
global.window.Notification = new Notification()
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
