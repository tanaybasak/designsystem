function getClosest(element, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(
          s
        );
        let i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

  // Get the closest matching element
  for (; element && element !== document; element = element.parentNode) {
    if (element.matches(selector)) return element;
  }
  return null;
}

export default getClosest;
