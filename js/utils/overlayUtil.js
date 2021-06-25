const overlayAdjustment = 2;

export const getPositions = (
  propsDirection,
  width,
  height,
  targetEl,
  attachElementToBody
) => {
  const parentElementPosition = targetEl.getBoundingClientRect();

  const direction = getDirection(
    propsDirection,
    width,
    height,
    parentElementPosition
  );

  let left = 0;
  let top = 0;
  if (attachElementToBody) {
    switch (direction) {
      case 'bottom-left': {
        left = parentElementPosition.left;
        top = parentElementPosition.bottom;
        break;
      }
      case 'bottom-right': {
        left = parentElementPosition.right - width;
        top = parentElementPosition.bottom;

        break;
      }
      case 'top-left': {
        left = parentElementPosition.left;
        top = parentElementPosition.top - height;

        break;
      }
      case 'top-right': {
        left = parentElementPosition.right - width;
        top = parentElementPosition.top - height;

        break;
      }
    }

    return {
      left: left + window.pageXOffset + 'px',
      top: top + 2 + window.pageYOffset + 'px',
      direction
    };
  } else {
    switch (direction) {
      case 'bottom-left': {
        left = 0;
        top =
          parentElementPosition.height +
          (parentElementPosition.top -
            targetEl.parentElement.getBoundingClientRect().top);
        break;
      }
      case 'bottom-right': {
        left = parentElementPosition.width - width;
        top =
          parentElementPosition.height +
          (parentElementPosition.top -
            targetEl.parentElement.getBoundingClientRect().top);

        break;
      }
      case 'top-left': {
        left = 0;
        top =
          -height +
          (parentElementPosition.top -
            targetEl.parentElement.getBoundingClientRect().top);

        break;
      }
      case 'top-right': {
        left = parentElementPosition.width - width;
        top =
          -height +
          (parentElementPosition.top -
            targetEl.parentElement.getBoundingClientRect().top);

        break;
      }
    }

    return {
      left: left + 'px',
      top: top + 2 + 'px',
      direction
    };
  }
};

export const visibleY = el => {
  let rect = el.getBoundingClientRect();
  const top = rect.top;
  const height = rect.height;
  let newEl = el.parentNode;
  // Check if bottom of the element is off the page
  if (rect.bottom < 0) {
    return false;
  }
  // Check its within the document viewport
  if (top > document.documentElement.clientHeight) {
    return false;
  }
  do {
    rect = newEl.getBoundingClientRect();
    // eslint-disable-next-line no-mixed-operators
    if (top <= rect.bottom === false) {
      return false;
    }
    // Check if the element is out of view due to a container scrolling
    if (top + height <= rect.top) {
      return false;
    }
    newEl = newEl.parentNode;
  } while (newEl !== document.body);
  return true;
};

const isOutofBound = (propsDirection, width, height, parentElementPosition) => {
  let outOfBound = false;
  switch (propsDirection) {
    case 'top': {
      if (parentElementPosition.top - height < overlayAdjustment) {
        outOfBound = true;
      }
      break;
    }
    case 'bottom': {
      if (
        parentElementPosition.bottom + height >
        window.innerHeight - overlayAdjustment
      ) {
        outOfBound = true;
      }
      break;
    }
    case 'left': {
      if (
        parentElementPosition.left + width >
        window.innerWidth - overlayAdjustment
      ) {
        outOfBound = true;
      }
      break;
    }
    case 'right': {
      if (parentElementPosition.right - width < overlayAdjustment) {
        outOfBound = true;
      }
      break;
    }
  }
  return outOfBound;
};

const getDirection = (propsDirection, width, height, parentElementPosition) => {
  const splitDirection = propsDirection.split('-');
  const first = isOutofBound(
    splitDirection[0],
    width,
    height,
    parentElementPosition
  );
  const second = isOutofBound(
    splitDirection[1],
    width,
    height,
    parentElementPosition
  );

  const direOb = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };
  const newDirection = `${
    first
      ? isOutofBound(
          direOb[splitDirection[0]],
          width,
          height,
          parentElementPosition
        )
        ? splitDirection[0]
        : direOb[splitDirection[0]]
      : splitDirection[0]
  }-${
    second
      ? isOutofBound(
          direOb[splitDirection[1]],
          width,
          height,
          parentElementPosition
        )
        ? splitDirection[1]
        : direOb[splitDirection[1]]
      : splitDirection[1]
  }`;
  return newDirection;
};
