/******************************************************************
 * HCL Confidential
 *
 * Copyright HCL Technologies Ltd. 2019 All rights reserved.
 *
 *******************************************************************
 */
import delegate from "delegate";
import handleDataBinding from "./utils/data-api";
import { NOOP } from "./utils/functions";

class Navigation {
  constructor(element, options) {
    this.element = element;
    this.state = {
      ...{
        isOpen: false,
        onChange: NOOP
      },
      ...options
    };
    this.setNavigationState(this.state.isOpen);
  }

  setNavigationState() {
    if (this.state.isOpen) {
      this.element.classList.add("hcl-sidebar-expanded");
      document.addEventListener("click", this.handleDocumentClick);
    } else {
      this.element.classList.remove("hcl-sidebar-expanded");
      document.removeEventListener("click", this.handleDocumentClick);
    }
  }

  toggleNavigationState() {
    this.state.isOpen = !this.state.isOpen;
    this.setNavigationState();
    if (typeof this.state.onClick === "function") {
      this.state.onChange(this.state.isOpen);
    }
  }

  handleDocumentClick = () => {
    if (this.state.isOpen) {
      this.state.isOpen = false;
      this.setNavigationState();
    }
    document.removeEventListener("click", this.handleDocumentClick);
  };

  attachEvents() {
    this.element
      .querySelector(".hcl-sidebar-title")
      .addEventListener("click", e => {
        e.stopPropagation();
        this.toggleNavigationState();
      });

    document
      .querySelector(".hcl-navbar-hamburger")
      .addEventListener("click", e => {
        e.stopPropagation();
        this.toggleNavigationState();
      });
  }

  static handleDataAPI = () => {
    const navigation = document.querySelector(`[data-component="navigation"]`);

    handleDataBinding("navigation", function(element) {
      return new Navigation(navigation, { isOpen: true });
    });

    handleDataBinding("hamburger", function() {
      return new Navigation(navigation, { isOpen: true });
    });
  };
}

export default Navigation;
