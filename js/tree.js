import handleDataBinding from './utils/data-api';

class Tree {
  constructor(element) {
    this.element = element;
    this.expandedIcon =
      this.element.getAttribute('data-expanded-icon') || 'caret caret-down';
    this.collapsedIcon =
      this.element.getAttribute('data-collapsed-icon') || 'caret';
    this.selectedElement = null;
  }

  findNextSiblingAncestor = nodeElement => {
    const parentNodeElement = nodeElement.parentElement;
    if (parentNodeElement) {
      if (parentNodeElement.nextElementSibling) {
        return parentNodeElement.nextElementSibling;
      } else {
        return this.findNextSiblingAncestor(parentNodeElement);
      }
    } else {
      return null;
    }
  };

  findLastVisibleChildren = nodeElement => {
    let nodeStatus = nodeElement.getAttribute('aria-expanded');
    if (nodeStatus === undefined || nodeStatus === null) {
      if (nodeElement.children.length > 1) {
        nodeStatus = 'false';
      }
    }
    if (
      nodeStatus === 'true' &&
      nodeElement.children &&
      nodeElement.children.length > 1
    ) {
      const childrenListElements = nodeElement.children[1].children;
      const lastChildElement =
        childrenListElements[childrenListElements.length - 1];
      return this.findLastVisibleChildren(lastChildElement);
    } else {
      return nodeElement;
    }
  };

  attachEvents = () => {
    const nodeElements = this.element.getElementsByClassName('tree-node');
    for (let i = 0; i < nodeElements.length; i++) {
      const nodeElement = nodeElements[i];

      let icon = this.collapsedIcon;
      if (nodeElement.parentElement.getAttribute('aria-expanded') === 'true') {
        icon = this.expandedIcon;
      }
      let canProceed = true;
      if (icon) {
        const classList = icon.split(' ');
        if (
          nodeElement.getElementsByClassName('toggle-icon') &&
          nodeElement.getElementsByClassName('toggle-icon').length > 0
        ) {
          nodeElement
            .getElementsByClassName('toggle-icon')[0]
            .classList.add(...classList);
        } else {
          //   const toggleIcon = document.createElement('i');
          //   toggleIcon.className = 'toggle-icon caret';
          //   toggleIcon.style.visibility = 'hidden';
          //   nodeElement.insertBefore(toggleIcon, nodeElement.childNodes[0]);
          canProceed = false;
        }
      }
      if (nodeElement.querySelector('.toggle-icon') && canProceed) {
        nodeElement.addEventListener('click', e => {
          this.toggleTree(e.currentTarget.children[0]);
        });
      }

      nodeElement.addEventListener('keydown', e => {
        this.keyDownOnTree(e, canProceed);
      });

      nodeElement.querySelector('span').addEventListener('click', e => {
        e.stopPropagation();
        this.selectNode(e.currentTarget);
      });
    }
  };

  selectNode = node => {
    if (node !== this.selectedElement) {
      if (this.selectedElement) {
        this.selectedElement.classList.remove('highlight');
      }
      this.selectedElement = node;
      node.classList.add('highlight');
    }
  };

  focusNode = node => {
    if (node.classList.contains('tree-item')) {
      node.children[0].focus();
    }
  };

  keyDownOnTree = (e, isChildrenExist) => {
    var key = e.which || e.keyCode;
    const nodeElement = e.currentTarget;

    let nodeStatus = nodeElement.parentElement.getAttribute('aria-expanded');

    if (nodeStatus === undefined || nodeStatus === null) {
      if (nodeElement.parentElement.children.length > 1) {
        nodeStatus = 'false';
      }
    }

    switch (key) {
      case 40: {
        if (
          nodeStatus === 'true' &&
          nodeElement.nextElementSibling &&
          nodeElement.nextElementSibling.children &&
          nodeElement.nextElementSibling.children.length > 0
        ) {
          this.focusNode(nodeElement.nextElementSibling.children[0]);
        } else {
          if (nodeElement.parentElement.nextElementSibling) {
            this.focusNode(nodeElement.parentElement.nextElementSibling);
          } else {
            const nextSiblingAncestor = this.findNextSiblingAncestor(
              nodeElement
            );
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
          const lastElement = this.findLastVisibleChildren(
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
        if (nodeStatus === 'false' && isChildrenExist) {
          this.toggleTree(nodeElement.children[0]);
        }
        e.preventDefault();
        break;
      }
      case 37: {
        if (nodeStatus === 'true' && isChildrenExist) {
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
      case 13: {
        const highlightElement = nodeElement.querySelector('span');
        this.selectNode(highlightElement);
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  toggleTree = nodeElement => {
    const collapsedStatus =
      nodeElement.parentElement.parentElement.getAttribute('aria-expanded') ||
      'false';

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
    handleDataBinding('tree', function (element) {
      return new Tree(element);
    });
  };
}
export default Tree;
