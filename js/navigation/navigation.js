import { PREFIX } from '../utils/config';

class Navigation {
  constructor(element, options) {
    this.element = element;

    this.state = {
      expanded: false,
      ...options
    };

    this.title = this.element.querySelector(`.${PREFIX}-sidebar-title`);
    this.hamburger = this.element.querySelector(`.${PREFIX}-sidebar-hamburger`);
    this.categories = this.element.querySelectorAll(
      `.${PREFIX}-sidebar-category-title`
    );
    this.items = this.element.querySelectorAll(`.${PREFIX}-sidebar-item`);
    this.activeItem = null;
  }

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
      if (!this.isDescendant(this.element, event.target)) {
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
    if (chk && window.screen.width < 992) {
      this.hideSidebarDocumentClick();
    }

    this.state.expanded = !this.state.expanded;
  };

  toggleCategory = event => {
    const comp = event.currentTarget.parentNode;

    if (comp.classList.contains('expanded')) {
      comp.classList.remove('expanded');
    } else {
      comp.classList.add('expanded');
    }
  };

  toggleItems = event => {
    const comp = event.currentTarget;

    if (this.activeItem && this.activeItem.classList) {
      this.activeItem.classList.toggle(`${PREFIX}-sidebar-item-active`, false);
    }
    comp.classList.add(`${PREFIX}-sidebar-item-active`);
    this.activeItem = comp;
  };

  attachEvents = () => {
    this.title.addEventListener('click', this.toggleSidebar);
    this.hamburger.addEventListener('click', this.toggleSidebar);
    this.categories.forEach(category => {
      category.addEventListener('click', this.toggleCategory);
    });
    this.items.forEach(item => {
      item.addEventListener('click', this.toggleItems);
    });
  };
}

export default Navigation;
