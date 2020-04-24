import { PREFIX } from './utils/config';
import getClosest from './utils/get-closest';

class Sidebar {
  constructor(element, options) {
    this.element = element;

    this.state = {
      expanded: false,
      ...options
    };

    this.title = this.element.querySelector(`.${PREFIX}-sidebar-title`);
    this.hamburger = this.element.querySelector(`.${PREFIX}-sidebar-hamburger`);
    this.categories = this.element.querySelectorAll(
      `.${PREFIX}-sidebar-toggle-node`
    );
    this.items = this.element.querySelectorAll(`.${PREFIX}-sidebar-item`);
    this.activeItem = null;
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

  isDescendant = (parent, child) => {
    let node = child.parentNode;
    while (node != null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  updateContainers = chk => {
    const containers = document.querySelectorAll(`[data-withsidenav]`);
    if (containers && containers.length) {
      containers.forEach(container =>
        container.classList.toggle('sidebar-expanded', chk)
      );
    }
  };

  hideSidebarDocumentClick = () => {
    const handler = event => {
      const sidebarLink = getClosest(event.target, 'a');
      if (
        !this.isDescendant(this.element, event.target) ||
        (sidebarLink && sidebarLink.classList.contains('hcl-sidebar-item'))
      ) {
        document.removeEventListener('click', handler);
        if (this.state.expanded) {
          this.element.classList.remove('expanded');
          this.state.expanded = false;
          this.updateContainers(false);
        }
      }
    };
    document.addEventListener('click', handler);
  };

  toggleSidebar = () => {
    const item = this.element;

    const chk = !this.state.expanded;
    item.classList.toggle('expanded', chk);
    this.updateContainers(chk);
    if (chk && window.innerWidth < 992) {
      this.hideSidebarDocumentClick();
    }

    this.state.expanded = !this.state.expanded;
  };

  toggleCategory = event => {
    const comp = event.currentTarget.parentNode;
    if (
      !comp.getAttribute('aria-expanded') ||
      comp.getAttribute('aria-expanded') === 'false'
    ) {
      comp.setAttribute('aria-expanded', 'true');
    } else {
      comp.setAttribute('aria-expanded', 'false');
    }
  };

  toggleItems = event => {
    const comp = event.currentTarget.parentNode;
    if (this.activeItem && this.activeItem.classList) {
      this.activeItem.classList.toggle(`active`, false);
    }
    comp.classList.add(`active`);
    this.activeItem = comp;
  };

  focusNode = node => {
    if (node.classList.contains('hcl-sidebar-category')) {
      node.firstElementChild.focus();
    }
  };

  keyDownOnTree = e => {
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
        if (nodeStatus === 'false' && nodeElement.nextElementSibling) {
          this.toggleCategory(e);
        }
        e.preventDefault();
        break;
      }
      case 37: {
        if (nodeStatus === 'true' && nodeElement.nextElementSibling) {
          this.toggleCategory(e);
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
        if (nodeStatus === 'true' && nodeElement.nextElementSibling) {
          this.toggleCategory(e);
        } else {
          nodeElement.click();
        }
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  attachEvents = () => {
    this.title.addEventListener('click', this.toggleSidebar);
    this.hamburger.addEventListener('click', this.toggleSidebar);
    this.categories.forEach(category => {
      category.addEventListener('click', this.toggleCategory);
      category.addEventListener('keydown', this.keyDownOnTree);
    });
    this.items.forEach(item => {
      item.addEventListener('click', this.toggleItems);
      item.addEventListener('keydown', this.keyDownOnTree);
    });
  };
}

export default Sidebar;
