import { addListener, removeListeners } from './eventManager';
import { PREFIX } from './utils/config';
import { getRem } from './utils/dom';
let elementNo = 1;
let tooltipElementRef = 1;
const tooltipContents = {};
class Tooltip {
  constructor(element) {
    this.element = element;
    this.eventName = element.hasAttribute('data-focus-on-click')
      ? 'click'
      : 'mouseover';
    this.type = element.getAttribute('data-type') || 'definition';
    this.dataValue = element.getAttribute('data-tooltip');
    this.direction = element.getAttribute('data-direction') || 'bottom';
    this.positionDirection = this.direction;
    this.status = false;
    this.diff = 0;
    this.targetTooltipContent = null;
    this.tooltipId = tooltipElementRef++;
  }

  attachEvents() {
    if (this.dataValue.startsWith('#')) {
      if (!tooltipContents[this.dataValue.substr(1)]) {
        const element = document.getElementById(this.dataValue.substr(1));
        if (element) {
          const elementId = 'tooltip-' + elementNo++;
          this.element.setAttribute('aria-describedby', elementId);
          const tooltip = document.createElement('div');
          tooltip.setAttribute('id', elementId);
          tooltip.className = `${PREFIX}-tooltip ${PREFIX}-tooltip-${this.type}`;
          if (this.element.hasAttribute('data-focus-on-click')) {
            tooltip.setAttribute('data-focus-on-click', true);
          }
          const icon = document.createElement('div');
          icon.className = `${PREFIX}-tooltip-arrow`;
          tooltip.appendChild(icon);
          tooltip.appendChild(element);
          tooltipContents[this.dataValue.substr(1)] = tooltip;
          this.targetTooltipContent = tooltip;
        }
      } else {
        this.targetTooltipContent = tooltipContents[this.dataValue.substr(1)];
        this.element.setAttribute(
          'aria-describedby',
          this.targetTooltipContent.id
        );
      }
    }
    this.element.addEventListener(this.eventName, () => {
      this.show();
    });
    if (this.eventName !== 'click') {
      this.element.addEventListener('focus', () => {
        this.show();
      });
      this.element.addEventListener('blur', () => {
        this.hide();
      });
      this.element.addEventListener('mouseout', () => {
        this.hide();
      });
    } else {
      this.element.addEventListener('keypress', e => {
        var key = e.which || e.keyCode;
        if (key === 13) {
          this.show();
        }
      });
    }
  }

  closeTooltip(e) {
    const tooltip = document.getElementById(
      this.element.getAttribute('aria-describedby')
    );
    if (
      !e ||
      (tooltip &&
        !(tooltip.contains(e.target) || this.element.contains(e.target)))
    ) {
      if (tooltip) {
        removeListeners('id-' + this.tooltipId, 'click');
        removeListeners('id-' + this.tooltipId, 'scroll');
        removeListeners('id-' + this.tooltipId, 'keypress');
        document.body.removeChild(tooltip);
        this.status = false;
      }
    }
  }

  show() {
    if (this.status) {
      return;
    }

    let tooltip = null;
    let icon = null;
    if (this.type === 'definition' && this.eventName !== 'click') {
      this.element.classList.add(`${PREFIX}-tooltip-dottedline`);
    }
    const elementId = 'tooltip-' + elementNo++;
    if (this.dataValue.startsWith('#')) {
      tooltip = this.targetTooltipContent;
      icon = tooltip.children[0];
      document.body.appendChild(tooltip);
    } else {
      this.element.setAttribute('aria-describedby', elementId);
      tooltip = document.createElement('div');
      tooltip.setAttribute('id', elementId);
      tooltip.className = `${PREFIX}-tooltip ${PREFIX}-remove-tooltip ${PREFIX}-tooltip-${this.type}`;
      if (this.eventName === 'click') {
        tooltip.setAttribute('data-focus-on-click', true);
      }
      icon = document.createElement('div');
      icon.className = `${PREFIX}-tooltip-arrow`;
      const content = document.createElement('div');
      content.innerHTML = this.dataValue;
      tooltip.appendChild(icon);
      tooltip.appendChild(content);
      document.body.appendChild(tooltip);
    }
    if (this.eventName === 'click') {
      addListener(
        'id-' + this.tooltipId,
        'click',
        e => {
          this.closeTooltip(e);
        },
        true
      );
      addListener(
        'id-' + this.tooltipId,
        'keypress',
        e => {
          var key = e.which || e.keyCode;
          if (key === 13) {
            this.closeTooltip(e);
          }
        },
        true
      );
    }
    addListener(
      'id-' + this.tooltipId,
      'scroll',
      e => {
        this.updatePositionOnScroll(e);
      },
      true
    );
    tooltip.style.minWidth = tooltip.offsetWidth + 'px';
    this.tooltipDirection(
      this.element,
      tooltip,
      icon,
      this.direction,
      this.type
    );
    this.status = true;
  }

  hide() {
    if (!this.status) {
      return;
    }

    if (this.type === 'definition') {
      this.element.classList.remove(`${PREFIX}-tooltip-dottedline`);
    }
    const tooltip = document.getElementById(
      this.element.getAttribute('aria-describedby')
    );
    if (tooltip) {
      removeListeners('id-' + this.tooltipId, 'scroll');
      if (this.eventName === 'click') {
        removeListeners('id-' + this.tooltipId, 'click');
        removeListeners('id-' + this.tooltipId, 'keypress');
      }
      document.body.removeChild(tooltip);
    }
    this.status = false;
  }

  tooltipDirection(parent, tooltip, icon, posHorizontal, type) {
    const dist = 10;
    const parentCoords = parent.getBoundingClientRect();
    this.diff = undefined;
    this.direction = this.getDirection(
      parentCoords,
      tooltip,
      dist,
      posHorizontal
    );
    this.positionDirection = this.getDirectionPosition(
      parentCoords,
      tooltip,
      this.direction
    );
    icon.setAttribute('data-direction', this.direction);
    this.showTooltip(
      parentCoords,
      tooltip,
      icon,
      this.positionDirection,
      dist,
      type
    );
  }

  updateIconPosition(icon, position, value) {
    icon.removeAttribute('style');
    icon.style[position] = getRem(value);
  }

  showTooltip(parentCoords, tooltip, icon, posHorizontal, dist, type) {
    let left = 0;
    let top = 0;
    let bottom = 0;
    let right = 0;
    const arrowSize = type === 'icon' ? 2.5 : 5;
    const offsetY = window.pageYOffset;
    const offsetX = window.pageXOffset;

    if (posHorizontal.startsWith('left')) {
      left = parseInt(parentCoords.left) - dist - tooltip.offsetWidth;
      top =
        (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
        tooltip.offsetHeight / 2;
      if (posHorizontal === 'left') {
        this.updateIconPosition(
          icon,
          'top',
          tooltip.offsetHeight / 2 - arrowSize
        );
      } else {
        if (this.diff === undefined) {
          if (posHorizontal === 'left top') {
            this.diff = top;
            this.updateIconPosition(
              icon,
              'top',
              parentCoords.top + parentCoords.height / 2 - arrowSize
            );
          } else {
            bottom =
              (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
              tooltip.offsetHeight / 2;
            this.diff = bottom - window.innerHeight;
            this.updateIconPosition(
              icon,
              'bottom',
              window.innerHeight -
                (parentCoords.bottom - parentCoords.height / 2) -
                arrowSize
            );
          }
        }
        top = top - this.diff;
      }
      tooltip.style.left = getRem(left + offsetX);
      tooltip.style.top = getRem(top + offsetY);
    } else if (posHorizontal.startsWith('right')) {
      top =
        (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
        tooltip.offsetHeight / 2;
      left = parseInt(parentCoords.right) + dist;
      if (posHorizontal === 'right') {
        this.updateIconPosition(
          icon,
          'top',
          tooltip.offsetHeight / 2 - arrowSize
        );
      } else {
        if (this.diff === undefined) {
          if (posHorizontal === 'right top') {
            this.diff = top;
            this.updateIconPosition(
              icon,
              'top',
              parentCoords.top + parentCoords.height / 2 - arrowSize
            );
          } else {
            bottom =
              (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
              tooltip.offsetHeight / 2;
            this.diff = bottom - window.innerHeight;
            this.updateIconPosition(
              icon,
              'bottom',
              window.innerHeight -
                parentCoords.bottom +
                parentCoords.height / 2 -
                arrowSize
            );
          }
        }
        top = top - this.diff;
      }
      tooltip.style.left = getRem(left + offsetX);
      tooltip.style.top = getRem(top + offsetY);
    } else if (posHorizontal.startsWith('top')) {
      left =
        parseInt(parentCoords.left) +
        (parentCoords.width - tooltip.offsetWidth) / 2;
      top = parseInt(parentCoords.top) - tooltip.offsetHeight - dist;

      if (posHorizontal === 'top') {
        this.updateIconPosition(
          icon,
          'left',
          tooltip.offsetWidth / 2 - arrowSize
        );
      } else {
        if (this.diff === undefined) {
          if (posHorizontal === 'top left') {
            this.diff = left;
            this.updateIconPosition(
              icon,
              'left',
              parentCoords.left + parentCoords.width / 2 - arrowSize
            );
          } else {
            right =
              parseInt(parentCoords.right) +
              (tooltip.offsetWidth - parentCoords.width) / 2;
            this.diff = right - window.innerWidth;
            this.updateIconPosition(
              icon,
              'right',
              window.innerWidth -
                parentCoords.right +
                parentCoords.width / 2 -
                arrowSize
            );
          }
        }
        left = left - this.diff;
      }
      tooltip.style.top = getRem(top + offsetY);
      tooltip.style.left = getRem(left + offsetX);
    } else if (posHorizontal.startsWith('bottom')) {
      left =
        parseInt(parentCoords.left) +
        (parentCoords.width - tooltip.offsetWidth) / 2;
      top = parseInt(parentCoords.bottom) + dist;

      if (posHorizontal === 'bottom') {
        this.updateIconPosition(
          icon,
          'left',
          tooltip.offsetWidth / 2 - arrowSize
        );
      } else {
        if (this.diff === undefined) {
          if (posHorizontal === 'bottom left') {
            this.diff = left;
            this.updateIconPosition(
              icon,
              'left',
              parentCoords.left + parentCoords.width / 2 - arrowSize
            );
          } else {
            right =
              parseInt(parentCoords.right) +
              (tooltip.offsetWidth - parentCoords.width) / 2;
            this.diff = right - window.innerWidth;
            this.updateIconPosition(
              icon,
              'right',
              window.innerWidth -
                parentCoords.right +
                parentCoords.width / 2 -
                arrowSize
            );
          }
        }
        left = left - this.diff;
      }
      tooltip.style.left = getRem(left + offsetX);
      tooltip.style.top = getRem(top + offsetY);
    }
    tooltip.classList.add('show');
  }

  getDirectionPosition(parentCoords, tooltip, posHorizontal) {
    let left = 0;
    let top = 0;
    let bottom = 0;
    let right = 0;
    let direction = posHorizontal;
    switch (posHorizontal) {
      case 'left': {
        top =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
          tooltip.offsetHeight / 2;
        bottom =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
          tooltip.offsetHeight / 2;
        if (top < 0) {
          direction = 'left top';
        } else if (bottom > window.innerHeight) {
          direction = 'left bottom';
        }
        break;
      }
      case 'right': {
        top =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 -
          tooltip.offsetHeight / 2;
        bottom =
          (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 +
          tooltip.offsetHeight / 2;
        if (top < 0) {
          direction = 'right top';
        } else if (bottom > window.innerHeight) {
          direction = 'right bottom';
        }

        break;
      }
      case 'top': {
        left =
          parseInt(parentCoords.left) +
          (parentCoords.width - tooltip.offsetWidth) / 2;
        right =
          parseInt(parentCoords.right) +
          (tooltip.offsetWidth - parentCoords.width) / 2;
        if (left < 0) {
          direction = 'top left';
        } else if (right > window.innerWidth) {
          direction = 'top right';
        }
        break;
      }
      case 'bottom': {
        left =
          parseInt(parentCoords.left) +
          (parentCoords.width - tooltip.offsetWidth) / 2;
        right =
          parseInt(parentCoords.right) +
          (tooltip.offsetWidth - parentCoords.width) / 2;
        if (left < 0) {
          direction = 'bottom left';
        } else if (right > window.innerWidth) {
          direction = 'bottom right';
        }
        break;
      }
    }
    return direction;
  }

  getDirection(parentCoords, tooltip, dist, posHorizontal) {
    let newDirection = posHorizontal;
    switch (posHorizontal) {
      case 'left': {
        if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
          newDirection = 'right';
          if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
            newDirection = 'top';
            if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
              newDirection = 'bottom';
              if (
                this.isOutofBound(parentCoords, tooltip, dist, newDirection)
              ) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
      case 'right': {
        if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
          newDirection = 'left';
          if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
            newDirection = 'top';
            if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
              newDirection = 'bottom';
              if (
                this.isOutofBound(parentCoords, tooltip, dist, newDirection)
              ) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
      case 'top': {
        if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
          newDirection = 'bottom';
          if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
            newDirection = 'left';
            if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
              newDirection = 'right';
              if (
                this.isOutofBound(parentCoords, tooltip, dist, newDirection)
              ) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
      case 'bottom': {
        if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
          newDirection = 'top';
          if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
            newDirection = 'left';
            if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
              newDirection = 'right';
              if (
                this.isOutofBound(parentCoords, tooltip, dist, newDirection)
              ) {
                newDirection = posHorizontal;
              }
            }
          }
        }
        break;
      }
    }
    return newDirection;
  }

  isOutofBound(parentCoords, tooltip, dist, posHorizontal) {
    let isOutofBound = false;
    switch (posHorizontal) {
      case 'left': {
        if (parseInt(parentCoords.left) - dist - tooltip.offsetWidth < 0) {
          isOutofBound = true;
        }
        break;
      }
      case 'right': {
        if (
          parentCoords.right + dist + tooltip.offsetWidth >
          window.innerWidth
        ) {
          isOutofBound = true;
        }
        break;
      }
      case 'top': {
        if (parseInt(parentCoords.top) - tooltip.offsetHeight - dist < 0) {
          isOutofBound = true;
        }
        break;
      }
      case 'bottom': {
        if (
          parseInt(parentCoords.bottom) + dist + tooltip.offsetHeight >
          window.innerHeight
        ) {
          isOutofBound = true;
        }
        break;
      }
    }
    return isOutofBound;
  }

  updatePositionOnScroll() {
    if (!this.ticking && this.status) {
      window.requestAnimationFrame(() => {
        const newelement = document.getElementById(
          this.element.getAttribute('aria-describedby')
        );
        if (newelement) {
          this.showTooltip(
            this.element.getBoundingClientRect(),
            newelement,
            newelement.children[0],
            this.positionDirection,
            10,
            this.type
          );
        }
        this.ticking = false;
      });
      this.ticking = true;
    }
  }
}
export default Tooltip;
