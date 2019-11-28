// To check the HTML Element is provided or not

function isElement(o) {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string';
}

// To handle the document click
const trackDocumentClick = (element, callback) => {
  const handler = event => {
    if (event.target !== element) {
      document.removeEventListener('click', handler);
      if (typeof callback === 'function') {
        callback();
      }
    }
  };
  document.addEventListener('click', handler);
};

const findNextSiblingAncestor = nodeElement => {
  const parentNodeElement = nodeElement.parentElement;
  if (parentNodeElement) {
    if (parentNodeElement.nextElementSibling) {
      return parentNodeElement.nextElementSibling;
    } else {
      return findNextSiblingAncestor(parentNodeElement);
    }
  } else {
    return null;
  }
};
const findLastVisibleChildren = nodeElement => {
  if (
    nodeElement.getAttribute('aria-expanded') === 'true' &&
    nodeElement.children &&
    nodeElement.children.length > 1
  ) {
    const childrenListElements = nodeElement.children[1].children;
    const lastChildElement =
      childrenListElements[childrenListElements.length - 1];
    return findLastVisibleChildren(lastChildElement);
  } else {
    return nodeElement;
  }
};

// Converting px to rem
const getRem = value => {
  return value / 16 + 'rem';
};

export {
  isElement,
  trackDocumentClick,
  getRem,
  findNextSiblingAncestor,
  findLastVisibleChildren
};
