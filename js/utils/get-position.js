function getPosition(_className) {
    switch (true) {
      case /droptop/i.test(_className):
        return "top";
      case /dropright/i.test(_className):
        return "right";
      case /dropbottom/i.test(_className):
        return "bottom";
      case /dropleft/i.test(_className):
        return "left";
      default:
        return "bottom";
    }
  }
  
  export default getPosition;