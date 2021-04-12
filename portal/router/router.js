class Router {
  constructor(routes) {
    this.routes = routes;
    this.previousRoute = null;
    this.init();
  }

  init = () => {
    window.addEventListener('hashchange', e => {
      this.previousRoute = e.oldURL
        ? e.oldURL.indexOf('#') > -1
          ? e.oldURL.substr(e.oldURL.lastIndexOf('#') + 1)
          : 'accordion'
        : null;
      this.hasChanged();
    });
    this.hasChanged();
  };

  hasChanged = () => {
    if (window.location.hash.length > 0) {
      for (var i = 0, length = this.routes.length; i < length; i++) {
        var route = this.routes[i];
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          this.goToRoute(route.name);
        }
      }
    } else {
      for (let i = 0, length = this.routes.length; i < length; i++) {
        const route = this.routes[i];
        if (route.default) {
          this.goToRoute(route.name);
        }
      }
    }
  };

  goToRoute = name => {
    (async function (scope) {
      scope.updateSidebarActiveLink(scope.previousRoute, name);
      const component = await import('../pages/component');
      await component.render(name);
    })(this);
  };

  updateSidebarActiveLink = (previousRoute, currentRoute) => {
    if (previousRoute) {
      const previousSidebarLink = document
        .getElementById('sidebar')
        .querySelector(`[data-navigation="${previousRoute}"]`);
      if (previousSidebarLink) {
        previousSidebarLink.classList.remove('active');
      }
    }
    const currentSidebarLink = document
      .getElementById('sidebar')
      .querySelector(`[data-navigation="${currentRoute}"]`);
    if (currentSidebarLink) {
      currentSidebarLink.classList.add('active');
    }
  };
}
export default Router;
