/******************************************************************
 * HCL Confidential
 *
 * Copyright HCL Technologies Ltd. 2019 All rights reserved.
 *
 *******************************************************************
 */

import { PREFIX } from "./utils/config";

class Navigation {
    constructor(element, options) {
        this.element = element;

        this.state = {
            expanded: false,
            ...options
        };

        this.elements = this.element.querySelectorAll(`.${PREFIX}-sidebar-title`);
        this.categories = this.element.querySelectorAll(`.${PREFIX}-sidebar-category`);
    }

    toggleSidebar = (event) => {
        const comp = event.currentTarget;
        const item = comp.parentNode;

        if (this.state.expanded) {
            item.classList.remove("expanded");
        } else {
            item.classList.add("expanded");
        }

        this.state.expanded = !this.state.expanded;
    }

    toggleCategory = event => {
        const comp = event.currentTarget;

        if (comp.classList.contains("expanded")) {
            comp.classList.remove("expanded");
        } else {
            comp.classList.add("expanded");
        }
    }

    attachEvents = () => {
        this.elements.forEach((item, index) => {
            item.addEventListener("click", this.toggleSidebar);
        });
        this.categories.forEach((category, index) => {
            category.addEventListener("click", this.toggleCategory);
        });
    }
}

export default Navigation;