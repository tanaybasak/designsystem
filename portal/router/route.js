'use stict';

function Route(name, defaultRoute) {
  this.constructor(name, defaultRoute);
}

Route.prototype = {
  name: undefined,
  default: undefined,
  constructor: function (name, defaultRoute) {
    this.name = name;
    this.default = defaultRoute;
  },
  isActiveRoute: function (hashedPath) {
    return hashedPath.replace('#', '') === this.name;
  }
};

export default Route;
