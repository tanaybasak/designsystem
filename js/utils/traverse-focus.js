function focusNode(currentItem, direction = 'next') {
  const nextElem = currentItem.nextElementSibling;
  const prevElem = currentItem.previousElementSibling;
  if (direction === 'next') {
    if (!nextElem) {
      if (
        currentItem.parentElement.firstElementChild.hasAttribute('disabled')
      ) {
        focusNode(currentItem.parentElement.firstElementChild);
      } else {
        currentItem.parentElement.firstElementChild.focus();
      }
    } else if (nextElem && nextElem.hasAttribute('disabled')) {
      focusNode(nextElem);
    } else {
      if (nextElem) {
        nextElem.focus();
      }
    }
  } else if (direction === 'previous') {
    if (!prevElem) {
      if (currentItem.parentElement.lastElementChild.hasAttribute('disabled')) {
        focusNode(currentItem.parentElement.lastElementChild, 'previous');
      } else {
        currentItem.parentElement.lastElementChild.focus();
      }
    } else if (prevElem && prevElem.hasAttribute('disabled')) {
      focusNode(prevElem, 'previous');
    } else {
      if (prevElem) {
        prevElem.focus();
      }
    }
  }
};

export default focusNode;