'use strict';
function Router(routes) {
  this.constructor(routes);
  this.init();
}

Router.prototype = {
  routes: undefined,
  previousRoute: undefined,
  constructor: function (routes) {
    this.routes = routes;
  },
  init: function () {
    var r = this.routes;
    var that = this;
    (function (scope, r) {
      window.addEventListener('hashchange', function (e) {
        that.previousRoute = e.oldURL
          ? e.oldURL.indexOf('#') > -1
            ? e.oldURL.substr(e.oldURL.lastIndexOf('#') + 1)
            : 'accordion'
          : null;
        scope.hasChanged(scope, r);
      });
    })(this, r);
    this.hasChanged(this, r);
  },
  hasChanged: function (scope, r) {
    if (window.location.hash.length > 0) {
      for (var i = 0, length = r.length; i < length; i++) {
        var route = r[i];
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.goToRoute(route.name);
        }
      }
    } else {
      for (let i = 0, length = r.length; i < length; i++) {
        const route = r[i];
        if (route.default) {
          scope.goToRoute(route.name);
        }
      }
    }
  },
  goToRoute: function (name) {
    var that = this;
    (async function () {
      that.updateSidebarActiveLink(that.previousRoute, name);
      const component = await import('../pages/component');
      await component.render(name);
    })(this);
  },
  updateSidebarActiveLink: function (previousRoute, currentRoute) {
    if (previousRoute) {
      document
        .getElementById('sidebar')
        .querySelector(`[data-navigation="${previousRoute}"]`)
        .classList.remove('active');
    }
    document
      .getElementById('sidebar')
      .querySelector(`[data-navigation="${currentRoute}"]`)
      .classList.add('active');
  }
};

export default Router;
