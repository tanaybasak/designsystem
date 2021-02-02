class Route {
  constructor(name, defaultRoute) {
    this.name = name;
    this.default = defaultRoute;
  }

  isActiveRoute = hashedPath => {
    return hashedPath.replace('#', '') === this.name;
  };
}
export default Route;
