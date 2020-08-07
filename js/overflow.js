import { PREFIX } from './utils/config';
import Overlay from './overlay';
import { NOOP } from './utils/functions';
let overflowIdRef = 0;
class Overflow {
  constructor(element, options) {
    this.element = element;
    this.overflowId = overflowIdRef++;
    this.overlay = null;
    this.state = {
      isOpen: false,
      onChange: NOOP,
      attachElementToBody: false,
      scrollListner: false,
      ...options
    };
  }

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
    const listItem = e.target.parentElement;
    if (this.state.isOpen) {
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

  attachEvents = () => {
    const icon = this.element.children[0];
    const overflowMenu = this.element.querySelector('.hcl-overflow-menu');
    if (icon) {
      //   icon.addEventListener('keypress', function(event) {
      //     if (event.keyCode === 13) {
      //       event.preventDefault();
      //       icon.click();
      //     }
      //   });

      overflowMenu.addEventListener('keydown', e => {
        this.keyDownOnTree(e);
      });

      this.overlay = new Overlay(this.element.firstElementChild, {
        attachElementToBody: this.state.attachElementToBody,
        scrollListner: this.state.scrollListner,
        closeOnEscape: true,
        onToggle: (status, type) => {
          this.state.isOpen = status;
          if (status) {
            overflowMenu.querySelector('ul li button:not(:disabled)').focus();
          } else {
            if (type !== 'outside') {
              this.element.firstElementChild.focus();
            }
          }
        }
      });
      this.overlay.attachEvents();

      this.element
        .querySelectorAll(`.${PREFIX}-overflow-option`)
        .forEach(item => {
          item.firstElementChild.addEventListener('click', event => {
            if (typeof this.state.onChange === 'function') {
              this.overlay.hide('select');
              icon.focus();
              this.state.onChange(event, event.target.innerText);
              const anchor = item.querySelector('a');
              if (anchor) {
                window.open(anchor.href, event.metaKey ? '' : '_self');
              }
            }
          });
        });
    }
  };
}

export default Overflow;
