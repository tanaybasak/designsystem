import { PREFIX } from './utils/config';
import { addListener, removeListeners } from './eventManager';

let overflowIdRef = 0;
class Overflow {
  constructor(element, options) {
    this.element = element;
    this.overflowId = overflowIdRef++;
    this.state = {
      isOpen: false,
      ...options
    };
    this.toggleState(this.state.isOpen);
  }

  toggleState = state => {
    const overflowMenu = this.element.querySelector(`.${PREFIX}-overflow-menu`);
    const icon = this.element.children[0];
    const caret = overflowMenu.children[1];
    let outOfBound = false;
    if (state) {
      addListener(
        'overflow-' + this.overflowId,
        'click',
        e => {
          this.handleClick(e);
        },
        true
      );
      this.element.classList.add(`${PREFIX}-active`);
      overflowMenu.classList.add(`${PREFIX}-show`);
      overflowMenu.classList.remove(`${PREFIX}-hidden`);
      const parentHeight = (
        overflowMenu.parentElement.offsetHeight +
        8 -
        parseInt(getComputedStyle(icon).marginBottom)
      ).toString();
      overflowMenu.style.top = parentHeight.concat('px');
      this.updateOverflowMenuPos(overflowMenu, icon, caret, outOfBound);
      if (!this.isInViewport(overflowMenu)) {
        outOfBound = true;
        this.updateOverflowMenuPos(overflowMenu, icon, caret, outOfBound);
      }
    } else {
      removeListeners('overflow-' + this.overflowId, 'click');
      overflowMenu.classList.remove(`${PREFIX}-show`);
      this.element.classList.remove(`${PREFIX}-active`);
      overflowMenu.classList.add(`${PREFIX}-hidden`);
    }
  };

  handleClick = e => {
    if (this.element) {
      if (e && this.element.contains(e.target)) {
        return;
      }
      this.state.isOpen = !this.state.isOpen;
      this.toggleState(this.state.isOpen);
    }
  };

  isInViewport = elem => {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.left >= 0 &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  focusNode(listItem, direction = 'next') {
    const nextElem = listItem.nextElementSibling;
    const prevElem = listItem.previousElementSibling;
    if (direction === 'next') {
      if (!nextElem) {
        if (
          listItem.parentElement.firstElementChild.children[0].hasAttribute(
            'disabled'
          )
        ) {
          this.focusNode(listItem.parentElement.firstElementChild);
        } else {
          listItem.parentElement.firstElementChild.children[0].focus();
        }
      } else if (nextElem && nextElem.children[0].hasAttribute('disabled')) {
        this.focusNode(nextElem);
      } else {
        if (nextElem) {
          nextElem.children[0].focus();
        }
      }
    } else if (direction === 'previous') {
      if (!prevElem) {
        if (
          listItem.parentElement.lastElementChild.children[0].hasAttribute(
            'disabled'
          )
        ) {
          this.focusNode(listItem.parentElement.lastElementChild, 'previous');
        } else {
          listItem.parentElement.lastElementChild.children[0].focus();
        }
      } else if (prevElem && prevElem.children[0].hasAttribute('disabled')) {
        this.focusNode(prevElem, 'previous');
      } else {
        if (prevElem) {
          prevElem.children[0].focus();
        }
      }
    }
  }

  keyDownOnTree = e => {
    const key = e.which || e.keyCode;
    const nodeElement = e.currentTarget;
    const listItem = e.target.parentElement;
    const nodeStatus = nodeElement.classList.contains(`${PREFIX}-show`);
    if (nodeStatus) {
      switch (key) {
        case 40: {
          this.focusNode(listItem, 'next');
          e.preventDefault();
          break;
        }
        case 38: {
          this.focusNode(listItem, 'previous');
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    }
  };

  updateOverflowMenuPos = (overflowMenu, icon, caret, outOfBound) => {
    let caretPosition;
    if (overflowMenu.classList.contains(`${PREFIX}-overflow-right`)) {
      if (outOfBound) {
        caretPosition = (icon.offsetWidth / 2 - 18).toString();
        overflowMenu.style.left = null;
        overflowMenu.style.right = caretPosition.concat('px');
        caret.style.left = '10rem';
      } else {
        caretPosition = (icon.offsetWidth / 2 - 22).toString();
        overflowMenu.style.left = caretPosition.concat('px');
        overflowMenu.style.right = null;
        caret.style.left = null;
      }
    } else if (overflowMenu.classList.contains(`${PREFIX}-overflow-left`)) {
      if (outOfBound) {
        caretPosition = (icon.offsetWidth / 2 - 22).toString();
        overflowMenu.style.right = null;
        overflowMenu.style.left = caretPosition.concat('px');
        caret.style.left = '1rem';
      } else {
        caretPosition = (icon.offsetWidth / 2 - 18).toString();
        overflowMenu.style.right = caretPosition.concat('px');
        overflowMenu.style.left = null;
        caret.style.left = null;
      }
    }
  };

  attachEvents = () => {
    const icon = this.element.children[0];
    const overflowMenu = this.element.children[1];
    if (icon) {
      icon.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          icon.click();
        }
      });

      overflowMenu.addEventListener('keydown', e => {
        this.keyDownOnTree(e);
      });

      icon.addEventListener('click', event => {
        event.stopPropagation();
        this.state.isOpen = !this.state.isOpen;
        this.toggleState(this.state.isOpen);
        overflowMenu.querySelector('ul li button:not(:disabled)').focus();
      });

      this.element
        .querySelectorAll(`.${PREFIX}-overflow-option`)
        .forEach(item => {
          item.addEventListener('click', event => {
            if (typeof this.state.onChange === 'function') {
              this.state.isOpen = !this.state.isOpen;
              this.toggleState(this.state.isOpen);
              icon.focus();
              this.state.onChange(event, event.target.innerText);
              const anchor = item.querySelector('a');
              if (anchor) {
                window.open(anchor.href);
              }
            }
          });
        });
    }
  };
}

export default Overflow;
