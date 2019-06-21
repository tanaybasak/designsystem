import { PREFIX } from "./utils/config";
import handleDataBinding from "./utils/data-api";
import getClosest from "./utils/get-closest";

class Pagination {
    constructor(element, options) {
        this.element = element;
        this.selectors = {
            next: `.${PREFIX}-pagination-button-next`,
            previous: `.${PREFIX}-pagination-button-previous`,
            PageNumber: `.${PREFIX}-pagination-select.${PREFIX}-page-number`,
            PageItems: `.${PREFIX}-pagination-select.${PREFIX}-page-items`,
            pageStart: `.${PREFIX}-page-start`,
            pageEnd: `.${PREFIX}-page-end`,
            rangeStart: `.${PREFIX}-range-start`,
            rangeEnd: `.${PREFIX}-range-end`,
            totalitems: `.${PREFIX}-pagination-totalitems`
        }

        this.events = {
            eventPageChange: 'pageChange',
            eventPageNumber: 'pageNumber',
            eventPageItems: 'itemsPerPage',
        }

        this.buttons = {
            NEXT: 'next',
            PREVIOUS: 'previous'
        }

        this.state = {
            navigationButton: {
                clicked: false,
                which: this.buttons.NEXT
            },
            pageNumber: {
                clicked: false,
                value: 0
            },
            pageItems: {
                clicked: false,
                value: 0
            },
            totalItems: 0,
            currentPage: 1,
            ...options
        }

        this.toggleState(this.state);
    }

    toggleState = (state) => {
        const { clicked: navigationClicked = false, which } = state.navigationButton;
        const { clicked: pageNumberClicked = false } = state.pageNumber;
        const { clicked: pageItemsClicked = false } = state.pageItems;
        if (navigationClicked) {
            this.emitEvent(this.events.eventPageChange, { 'direction': which });
        }
        if (pageNumberClicked) {
            this.emitEvent(this.events.eventPageNumber, { 'value': state.pageNumber.value });
        }
        if (pageItemsClicked) {
            this.emitEvent(this.events.eventPageItems, { 'value': state.pageItems.value });
        }
    }

    emitEvent = (evtName, takedetail) => {
        const event = new CustomEvent(`${evtName}`, {
            bubbles: true,
            cancelable: true,
            detail: takedetail,
        });

        this.element.dispatchEvent(event);
    }

    next = (selector) => {
        let nextButton = this.element.querySelector(selector),
            pageItemsSelected = this.element.querySelector(this.selectors.PageItems),
            pages = this.getPages(this.state.totalItems,
                pageItemsSelected.options[pageItemsSelected.selectedIndex].value);

        if (nextButton && !nextButton.disabled && pages !== this.state.currentPage) {
            this.state.pageNumber.value++;
            this.element.querySelector(this.selectors.PageNumber).selectedIndex = this.state.pageNumber.value;
            this.state.currentPage++;
            if (pages === this.state.currentPage) {
                nextButton.disabled = true;
            } else {
                this.element.querySelector(this.selectors.previous).disabled = false;
                nextButton.disabled = false;
            }
            this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.NEXT });
        }
    }

    previous = (selector) => {
        let previousButton = this.element.querySelector(selector);
        this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.PREVIOUS });
    }

    handleNavigation = (e) => {
        const { target } = e;
        e.preventDefault();
        if (target && getClosest(target, this.selectors.next)) {
            this.next(this.selectors.next);
        } else if (target && getClosest(target, this.selectors.previous)) {
            this.previous(this.selectors.previous);
        }
    }

    handleChange = (e) => {
        const { target } = e;
        e.preventDefault();
        if (target && getClosest(target, this.selectors.PageNumber)) {
            this.emitEvent(this.events.eventPageNumber, { 'value': target['options'] ? target.options[target.selectedIndex].value : '' });
            if (target['options']) {
                this.element.querySelector(this.selectors.pageStart).innerHTML = target.options[target.selectedIndex].value;
            }
        } else if (target && getClosest(target, this.selectors.PageItems)) {
            this.emitEvent(this.events.eventPageItems, { 'value': target['options'] ? target.options[target.selectedIndex].value : '' });
            if (target['options']) {
                this.element.querySelector(this.selectors.rangeEnd).innerHTML = target.options[target.selectedIndex].value;
                this.emitEvent(this.events.eventPageNumber, { 'value': target['options'] ? target.options[target.selectedIndex].value : '' });
                this.createOption(this.selectors.PageNumber,
                    Number(this.element.querySelector(this.selectors.totalitems).innerText),
                    target.options[target.selectedIndex].value);
                this.state.pageItems = target.options[target.selectedIndex].value;
            }
        }
    }

    getPages = (totalItems, selectedValue) => {
        return (Math.ceil(totalItems / selectedValue));
    }

    createOption = (selector, totalItems, selectedValue) => {
        let pageNumberDropdown = this.element.querySelector(selector);

        while (pageNumberDropdown.firstChild) {
            pageNumberDropdown.removeChild(pageNumberDropdown.firstChild);
        }

        if (selectedValue && totalItems && !isNaN(selectedValue) && !isNaN(totalItems)) {
            let pages = this.getPages(totalItems, selectedValue),
                array = Array.from({ length: pages }, (v, k) => k + 1);

            //Create and append the options
            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("option");
                option.value = array[i];
                option.text = array[i];
                pageNumberDropdown.appendChild(option);
            }
            pageNumberDropdown.options[0].selected = true;
            this.element.querySelector(this.selectors.pageEnd).innerText = pages;
            this.element.querySelector(this.selectors.pageStart).innerText = 1;
        }
    }

    attachEvents = () => {
        const pageForward = this.element.querySelector(this.selectors.next);
        const PageBackward = this.element.querySelector(this.selectors.previous);
        const pageNumber = this.element.querySelector(this.selectors.PageNumber);
        const pageItems = this.element.querySelector(this.selectors.PageItems);
        pageForward.addEventListener('click', this.handleNavigation.bind(this));
        PageBackward.addEventListener('click', this.handleNavigation.bind(this));
        pageNumber.addEventListener('change', this.handleChange.bind(this));
        pageItems.addEventListener('change', this.handleChange.bind(this));
    }

    static handleDataAPI = () => {
        handleDataBinding("pagination", function (element, target) {
            if (element && target) {

                let defaultOption = {
                    navigationButton: {
                        clicked: false,
                        which: 'next'
                    },
                    pageNumber: {
                        clicked: false,
                        value: 0
                    },
                    pageItems: {
                        clicked: false,
                        value: 0
                    },
                    totalItems: 0,
                    currentPage: 1
                };

                if (getClosest(target, `.${PREFIX}-pagination-button-next`)) {
                    defaultOption['navigationButton'] = { clicked: true, which: 'next' };
                } else if (getClosest(target, `.${PREFIX}-pagination-button-previous`)) {
                    defaultOption['navigationButton'] = { clicked: true, which: 'previous' };
                } else if (getClosest(target, `.${PREFIX}-pagination-select.${PREFIX}-page-number`)) {
                    defaultOption['pageNumber'] = { clicked: true };
                } else if (getClosest(target, `.${PREFIX}-pagination-select.${PREFIX}-page-items`)) {
                    defaultOption['pageItems'] = { clicked: true };
                }

                if (element.querySelector(`.${PREFIX}-pagination-totalitems`)) {
                    defaultOption['totalItems'] = Number(element.querySelector(`.${PREFIX}-pagination-totalitems`).innerText);
                }

                return new Pagination(element, {
                    ...defaultOption
                });
            }
        });
    }
}
export default Pagination;