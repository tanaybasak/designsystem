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

class Navigation 
    {
        constructor(element, options)
            {
                this.element = element;
                this.state = {...{
                    isOpen : false,
                    onChange : NOOP
                }, ...options}
                this.setNavigationState(this.state.isOpen);
            }

        setNavigationState()
            {
                if(this.state.isOpen)
                    {
                        this.element.classList.add("hcl-sidebar-expanded");
                    }
                else
                    {
                        this.element.classList.remove("hcl-sidebar-expanded");
                    }
            }

        toggleNavigationState()
            {
                this.state.isOpen = !this.state.isOpen
                this.setNavigationState(this.state.isOpen);
                if(typeof this.state.onClick === "function")
                    {
                        this.state.onChange(this.state.isOpen)
                    }
            }

        attachEvents()
            {
                delegate(this.element, ".hcl-sidebar-title-item", "click", ()=>{
                    this.toggleNavigationState();
                })

                delegate(document, ".hcl-navbar-hamburger", "click", ()=>{
                    this.toggleNavigationState();
                })
            }

        static handleDataAPI = () => {
            handleDataBinding("navigation", function (element) {
                return new Navigation(element, { isOpen: true });
            })
        }
    }

export default Navigation;