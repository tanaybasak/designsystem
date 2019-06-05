// To check the HTML Element is provided or not

function isElement(o) {
  return typeof HTMLElement === "object"
    ? o instanceof HTMLElement
    : o &&
        typeof o === "object" &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === "string";
}

// To handle the document click
const trackDocumentClick = (element, callback) => {
  const handler = event => {
    if (event.target !== element) {
      document.removeEventListener("click", handler);
      callback();
    }
  };
  document.addEventListener("click", handler);
};

// Converting px to rem
const getRem = (value) => {
    return (value / 16) + 'rem';
}

export { isElement, trackDocumentClick, getRem };
