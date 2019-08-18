import { PREFIX } from "./utils/config";

class Navigation {
    constructor(element, options) {
        this.element = element;

        this.state = {
            expanded: false,
            ...options
        };

        this.title = this.element.querySelector(`.${PREFIX}-sidebar-title`);
        this.hamburger = this.element.querySelector(`.${PREFIX}-sidebar-hamburger`);
        this.categories = this.element.querySelectorAll(`.${PREFIX}-sidebar-category-title`);
        this.items = this.element.querySelectorAll(`.${PREFIX}-sidebar-item`);
    }

    isDescendant = (parent, child) => {
        let node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };

    hideSidebarDocumentClick = () => {
        const handler = event => {
            const classList = event.target.classList;
            if (!this.isDescendant(this.element, event.target)) {
                document.removeEventListener("click", handler);
                const containers = document.querySelectorAll(`[data-withsidenav]`);
                if (this.state.expanded) {
                    this.element.classList.remove("expanded");
                    this.state.expanded = false;
                    if (containers && containers.length) {
                        containers.forEach(container => container.classList.toggle('sidebar-expanded', false));
                    }
                }
            }
        };
        document.addEventListener("click", handler);
    };

    toggleSidebar = (event) => {
        const item = this.element;
        const containers = document.querySelectorAll(`[data-withsidenav]`);

        if (this.state.expanded) {
            item.classList.remove("expanded");
            if (containers && containers.length) {
                containers.forEach(container => container.classList.toggle('sidebar-expanded', false));
            }
        } else {
            item.classList.add("expanded");
            if (containers && containers.length) {
                containers.forEach(container => container.classList.toggle('sidebar-expanded', true));
            }
            this.hideSidebarDocumentClick();
        }

        this.state.expanded = !this.state.expanded;
    }

    toggleCategory = event => {
        const comp = event.currentTarget.parentNode;

        if (comp.classList.contains("expanded")) {
            comp.classList.remove("expanded");
        } else {
            comp.classList.add("expanded");
        }
    }

    toggleItems = event => {
        const comp = event.currentTarget;

        this.items.forEach(item => {
            if (item.classList.contains("hcl-sidebar-item-active")) {
                item.classList.remove("hcl-sidebar-item-active");
            }
        });
        comp.classList.add("hcl-sidebar-item-active");
    }

    attachEvents = () => {
        this.title.addEventListener("click", this.toggleSidebar);
        this.hamburger.addEventListener("click", this.toggleSidebar);
        this.categories.forEach((category, index) => {
            category.addEventListener("click", this.toggleCategory);
        });
        this.items.forEach((item, index) => {
            item.addEventListener("click", this.toggleItems);
        });
    }
}

export default Navigation;