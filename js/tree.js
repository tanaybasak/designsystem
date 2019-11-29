import handleDataBinding from './utils/data-api';
import { findLastVisibleChildren, findNextSiblingAncestor } from './utils/dom';

class Tree {
  constructor(element) {
    this.element = element;
    this.expandedIcon =
      this.element.getAttribute('data-expanded-icon') || 'caret caret-down';
    this.collapsedIcon =
      this.element.getAttribute('data-collapsed-icon') || 'caret';
  }

  attachEvents = () => {
    var toggler = this.element.getElementsByClassName('toggle-icon');

    var spans = this.element.getElementsByClassName('tree-node');
    for (var j = 0; j < spans.length; j++) {
      spans[j].addEventListener('keydown', e => {
        this.keyDownOnTree(e);
      });
    }

    const collapsedIcon = this.collapsedIcon;
    var i;
    for (i = 0; i < toggler.length; i++) {
      if (collapsedIcon) {
        const classList = collapsedIcon.split(' ');
        toggler[i].classList.add(...classList);
      }
      toggler[i].addEventListener('click', e => {
        this.toggleTree(e.currentTarget);
      });
    }
  };

  focusNode = node => {
    if (node.classList.contains('tree-item')) {
      node.children[0].focus();
    }
  };

  keyDownOnTree = e => {
    var key = e.which || e.keyCode;
    const nodeElement = e.currentTarget;
    switch (key) {
      case 40: {
        if (
          nodeElement.parentElement.getAttribute('aria-expanded') === 'true' &&
          nodeElement.nextElementSibling &&
          nodeElement.nextElementSibling.children &&
          nodeElement.nextElementSibling.children.length > 0
        ) {
          this.focusNode(nodeElement.nextElementSibling.children[0]);
        } else {
          if (nodeElement.parentElement.nextElementSibling) {
            this.focusNode(nodeElement.parentElement.nextElementSibling);
          } else {
            const nextSiblingAncestor = findNextSiblingAncestor(nodeElement);
            if (nextSiblingAncestor) {
              this.focusNode(nextSiblingAncestor);
            }
          }
        }
        e.preventDefault();
        break;
      }
      case 38: {
        if (nodeElement.parentElement.previousElementSibling) {
          const lastElement = findLastVisibleChildren(
            nodeElement.parentElement.previousElementSibling
          );
          this.focusNode(lastElement);
        } else {
          const parentNodeElement =
            nodeElement.parentElement.parentElement.parentElement;
          if (parentNodeElement) {
            this.focusNode(parentNodeElement);
          }
        }
        e.preventDefault();
        break;
      }
      case 39: {
        if (
          nodeElement.parentElement.hasAttribute('aria-expanded') &&
          nodeElement.parentElement.getAttribute('aria-expanded') === 'false'
        ) {
          this.toggleTree(nodeElement.children[0]);
        }
        e.preventDefault();
        break;
      }
      case 37: {
        if (
          nodeElement.parentElement.hasAttribute('aria-expanded') &&
          nodeElement.parentElement.getAttribute('aria-expanded') === 'true'
        ) {
          this.toggleTree(nodeElement.children[0]);
        } else {
          const parentNodeElement =
            nodeElement.parentElement.parentElement.parentElement;
          if (parentNodeElement) {
            this.focusNode(parentNodeElement);
          }
        }
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  toggleTree = nodeElement => {
    const collapsedStatus = nodeElement.parentElement.parentElement.getAttribute(
      'aria-expanded'
    );
    nodeElement.parentElement.parentElement.setAttribute(
      'aria-expanded',
      collapsedStatus === 'false' ? 'true' : 'false'
    );

    if (this.collapsedIcon) {
      const newClassList =
        collapsedStatus === 'false'
          ? this.expandedIcon.split(' ')
          : this.collapsedIcon.split(' ');
      const removeClassList =
        collapsedStatus === 'false'
          ? this.collapsedIcon.split(' ')
          : this.expandedIcon.split(' ');

      nodeElement.classList.remove(...removeClassList);
      nodeElement.classList.add(...newClassList);
    }
  };

  static handleDataAPI = () => {
    handleDataBinding('tree', function(element) {
      return new Tree(element);
    });
  };
}
export default Tree;
