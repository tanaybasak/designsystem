/******************************************************************
 * HCL Confidential
 *
 * Copyright HCL Technologies Ltd. 2019 All rights reserved.
 *
 *******************************************************************
 */
import handleDataBinding from "./utils/data-api";

class Search {
    constructor(element) {
        this.element = element;
        this.input = this.element.querySelector('input');
        this.searchIcon = this.element.querySelector('.hcl-search-btn');
        this.resetIcon = this.element.querySelector('.hcl-search-reset');
    }

    attachEvents() {
        if (this.element.classList.contains('hcl-search-btn-only')) {
            this.searchIcon.addEventListener('mousedown', (e) => { this.showSearch(e); });
            this.input.addEventListener('blur', (e) => { this.onBlur(e) });
        }
        this.resetIcon.addEventListener('mousedown', e => { this.clearSearch(e); });
        this.input.addEventListener('input', e => { this.displayReset(e); })
    }

    showSearch(event) {
        event.preventDefault();
        this.element.classList.remove('hcl-search-btn-only');
        this.element.classList.add('shown');
        this.searchIcon.style.display = "none";
        setTimeout(() => {
            this.input.focus();
        }, 150)
    }

    displayReset(e) {
        if (this.input.value !== '') {
            this.resetIcon.style.visibility = 'visible';
        } else {
            this.resetIcon.style.visibility = 'hidden';
        }
    }

    closeSearch() {
        this.element.classList.add('hcl-search-btn-only')
        this.element.classList.remove('shown');
    }

    clearSearch(event) {
        event.preventDefault();
        this.input.value = '';
        this.resetIcon.style.visibility = 'hidden';
        this.input.focus();
    }

    onBlur() {
        if (this.input.value === '') {
            this.element.classList.add('hcl-search-btn-only');
            this.searchIcon.style.display = 'block';
            this.element.classList.remove('shown');
        }
    }

    static handleDataAPI = () => {
        handleDataBinding("search", function (element) {
            return new Search(element);
        })
    }
}

export default Search;