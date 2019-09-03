import { PREFIX } from './utils/config';

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
  }

  toggleSidebar = event => {
    const comp = event.currentTarget;
    const item = comp.parentNode;
    const container = document.querySelector('[data-withsidenav]');

    if (this.state.expanded) {
      item.classList.remove('expanded');
      if (container) {
        container.classList.toggle('sidebar-expanded', false);
      }
    } else {
      item.classList.add('expanded');
      if (container) {
        container.classList.toggle('sidebar-expanded', true);
      }
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

    this.items.forEach(item => {
      if (item.classList.contains('hcl-sidebar-item-active')) {
        item.classList.remove('hcl-sidebar-item-active');
      }
    });
    comp.classList.add('hcl-sidebar-item-active');
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
