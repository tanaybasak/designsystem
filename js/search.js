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

class Search 
    {
        constructor(element, options)
            {
                this.element = element;
                this.state = {...{
                    isOpen : false,
                    onChange : NOOP
                }, ...options}
                this.setSearchState(this.state.isOpen);
            }

        setSearchState()
            {
                if(this.state.isOpen)
                    {
                        this.element.classList.remove("search-btn-only");
                    }
                else
                    {
                        this.element.classList.add("search-btn-only");
                    }
            }

        toggleSearchState()
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
                delegate(document, ".hcl-navbar-search-btn", "click", ()=>{
                    this.toggleSearchState();
                });
            }

        static handleDataAPI = () => {
            handleDataBinding("search", function (element) {
                return new Search(element, { isOpen: true });
            })
        }
    }

export default Search;