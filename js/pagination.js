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
                value: 1
            },
            pageItems: {
                clicked: false,
                value: 10
            },
            totalItems: 0,
            ...options
        }

        this.toggleState(this.state);
    }

    toggleState = (state) => {
        const { clicked: navigationClicked = false, which } = state.navigationButton;
        const { clicked: pageNumberClicked = false } = state.pageNumber;
        const { clicked: pageItemsClicked = false } = state.pageItems;
        let pageNumberDropdown = this.element.querySelector(this.selectors.PageNumber);
        if (navigationClicked) {
            if (which === this.buttons.NEXT) {
                this.state.pageNumber.value++;
                pageNumberDropdown.selectedIndex++;
            } else if (which === this.buttons.PREVIOUS) {
                this.state.pageNumber.value--;
                pageNumberDropdown.selectedIndex--;
            }
            this.emitEvent(this.events.eventPageChange, { 'direction': which });
        }
        if (pageNumberClicked) {
            const pageNumberDropdown = this.element.querySelector(this.selectors.PageNumber);
            this.state.pageNumber.value = pageNumberDropdown.options[pageNumberDropdown.selectedIndex].value;;
            this.emitEvent(this.events.eventPageNumber, { 'value': this.state.pageNumber.value });
        }
        if (pageItemsClicked) {
            this.state.pageItems
            this.emitEvent(this.events.eventPageItems, { 'value': this.state.pageItems.value });
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
            totalPages = this.getPages();

        if (nextButton && !nextButton.disabled && totalPages !== this.state.pageNumber.value) {
            let pageNumberDropdown = this.element.querySelector(this.selectors.PageNumber);
            pageNumberDropdown.selectedIndex++;
            this.state.pageNumber.value++;
            this.toggleNavigationButtons(pageNumberDropdown.selectedIndex, pageNumberDropdown.options.length);
            this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.NEXT });
        }
    }

    previous = (selector) => {
        let previousButton = this.element.querySelector(selector),
            pageItemsSelected = this.element.querySelector(this.selectors.PageItems);

        if (previousButton && !previousButton.disabled && this.state.pageNumber.value > 1) {
            let pageNumberDropdown = this.element.querySelector(this.selectors.PageNumber);
            pageNumberDropdown.selectedIndex--;
            this.state.pageNumber.value--;
            this.toggleNavigationButtons(pageNumberDropdown.selectedIndex, pageNumberDropdown.options.length);
            this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.PREVIOUS });
        }
    }

    handleNavigation = (e) => { // Next & Previous Button Click
        const { target } = e;
        e.preventDefault();
        if (target && getClosest(target, this.selectors.next)) {
            this.next(this.selectors.next);
        } else if (target && getClosest(target, this.selectors.previous)) {
            this.previous(this.selectors.previous);
        }
    }

    handleChange = (e) => { //Drop-Down Change
        const { target } = e;
        e.preventDefault();
        if (target && getClosest(target, this.selectors.PageNumber)) { // PageNumber Drop-Down change
            this.emitEvent(this.events.eventPageNumber, { 'value': target['options'] ? target.options[target.selectedIndex].value : '' });
            if (target['options']) {
                this.element.querySelector(this.selectors.pageStart).innerHTML = target.options[target.selectedIndex].value;
                this.state.pageNumber.value = target.options[target.selectedIndex].value;
                this.toggleNavigationButtons(target.selectedIndex, target.options.length);
            }
        } else if (target && getClosest(target, this.selectors.PageItems)) { // PageItems Drop-Down change
            this.emitEvent(this.events.eventPageItems, { 'value': target['options'] ? target.options[target.selectedIndex].value : '' });
            if (target['options']) {
                this.element.querySelector(this.selectors.rangeEnd).innerHTML = target.options[target.selectedIndex].value;
                this.emitEvent(this.events.eventPageNumber, { 'value': target['options'] ? target.options[target.selectedIndex].value : '' });
                this.createOption(this.selectors.PageNumber,
                    Number(this.element.querySelector(this.selectors.totalitems).innerText),
                    target.options[target.selectedIndex].value);
                    this.resetNavigationButtons();
                this.state.pageItems = target.options[target.selectedIndex].value;
            }
        }
    }

    resetNavigationButtons = () => {
        let nextButton = this.element.querySelector(this.selectors.next),
            previousButton = this.element.querySelector(this.selectors.previous);
        nextButton.disabled = false;
        previousButton.disabled = true;
    }

    toggleNavigationButtons = (selectedIndex, optionsLength) => {
        let nextButton = this.element.querySelector(this.selectors.next),
            previousButton = this.element.querySelector(this.selectors.previous),
            nextIndex = selectedIndex;
        nextIndex++;

        if (selectedIndex === 0) { //First Index
            previousButton.disabled = true;
            nextButton.disabled = false;
        } else if (nextIndex === optionsLength) { //Last Index
            nextButton.disabled = true;
            previousButton.disabled = false;
        } else { // Enable Navigation Buttons
            nextButton.disabled = false;
            previousButton.disabled = false;
        }
        let pageNumberDropDown = this.element.querySelector(this.selectors.PageNumber);
        this.element.querySelector(this.selectors.pageStart).innerHTML = pageNumberDropDown.options[pageNumberDropDown.selectedIndex].value;
    }

    getPages = () => {
        let pageItemsSelected = this.element.querySelector(this.selectors.PageItems);

        if (pageItemsSelected && this.state.totalItems) {
            return (Math.ceil(this.state.totalItems / pageItemsSelected.options[pageItemsSelected.selectedIndex].value));
        }
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
                        value: 1
                    },
                    pageItems: {
                        clicked: false,
                        value: 10
                    },
                    totalItems: 0,
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