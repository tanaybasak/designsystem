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
            totalitems: `.${PREFIX}-pagination-totalitems`,
            leftSection: `.${PREFIX}-pagination-left`,
            rightSection: `.${PREFIX}-pagination-right`,
            selectWrapper: `.${PREFIX}-pagination-select-wrapper`
        };

        this.events = {
            eventPageChange: 'pageChange',
            eventPageNumber: 'pageNumber',
            eventPageItems: 'itemsPerPage',
        };

        this.buttons = {
            NEXT: 'next',
            PREVIOUS: 'previous'
        };

        this.string = {
            dropdownsvg: `<svg class="hcl-select-arrow" width="10" height="5" viewBox="0 0 10 5">
                            <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd"></path>
                          </svg>`,
            pageItemsLimit: 100
        };

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
            itemstepper: 10,
            totalItems: 0,
            ...options
        }
        this.init();
        this.toggleState(this.state);
    }

    init = () => {
        this.createPageItemsDropDown();
        this.element.querySelector(this.selectors.totalitems).innerHTML = this.state.totalItems;
        const pageItemsDropDown = this.element.querySelector(this.selectors.PageItems);
        const pageNumberDropDown = this.element.querySelector(this.selectors.PageNumber);
        this.element.querySelector(this.selectors.rangeStart).innerHTML = 1;
        this.element.querySelector(this.selectors.pageStart).innerHTML = 1;
        this.element.querySelector(this.selectors.rangeEnd).innerHTML = pageItemsDropDown.options[pageItemsDropDown.selectedIndex].value;
        this.element.querySelector(this.selectors.pageEnd).innerHTML = pageNumberDropDown.options[pageNumberDropDown.options.length - 1].value;
    }

    toggleState = (state) => {
        let { clicked: navigationClicked = false, which } = state.navigationButton;
        let { clicked: pageNumberClicked = false } = state.pageNumber;
        let { clicked: pageItemsClicked = false } = state.pageItems;
        let pageNumberDropdown = this.element.querySelector(this.selectors.PageNumber);
        let pageItemsDropdown = this.element.querySelector(this.selectors.PageItems);
        if (navigationClicked) {
            if (which === this.buttons.NEXT) {
                this.state.pageNumber.value++;
                pageNumberDropdown.selectedIndex++;
            } else if (which === this.buttons.PREVIOUS) {
                this.state.pageNumber.value--;
                pageNumberDropdown.selectedIndex--;
            }
            this.toggleNavigationButtons(pageNumberDropdown.selectedIndex, pageNumberDropdown.options.length);
            this.adjustRangeChange();
            this.emitEvent(this.events.eventPageChange, { 'direction': which });
        }
        if (pageNumberClicked) {
            this.state.pageNumber.value = Number(pageNumberDropdown.options[pageNumberDropdown.selectedIndex].value);
        }
        if (pageItemsClicked) {
            this.state.pageItems.value = Number(pageItemsDropdown.options[pageItemsDropdown.selectedIndex].value);
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

    adjustRangeChange = () => {
        let { value: pageNumber } = this.state.pageNumber,
            rangeStart = this.element.querySelector(this.selectors.rangeStart),
            rangeEnd = this.element.querySelector(this.selectors.rangeEnd);
        rangeStart.innerHTML = ((pageNumber - 1) * this.state.pageItems.value) + 1;
        if ((pageNumber * this.state.pageItems.value) > this.state.totalItems) {
            rangeEnd.innerHTML = this.state.totalItems;
        } else {
            rangeEnd.innerHTML = (pageNumber * this.state.pageItems.value);
        }
    }

    next = (selector) => {
        let nextButton = this.element.querySelector(selector),
            totalPages = this.getPages();
        if (nextButton && !nextButton.disabled && totalPages !== this.state.pageNumber.value) {
            let pageNumberDropdown = this.element.querySelector(this.selectors.PageNumber);
            pageNumberDropdown.selectedIndex++;
            this.state.pageNumber.value++;
            this.toggleNavigationButtons(pageNumberDropdown.selectedIndex, pageNumberDropdown.options.length);
            this.adjustRangeChange();
            this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.NEXT });
        }
    }

    previous = (selector) => {
        let previousButton = this.element.querySelector(selector);

        if (previousButton && !previousButton.disabled && this.state.pageNumber.value > 1) {
            let pageNumberDropdown = this.element.querySelector(this.selectors.PageNumber);
            pageNumberDropdown.selectedIndex--;
            this.state.pageNumber.value--;
            this.toggleNavigationButtons(pageNumberDropdown.selectedIndex, pageNumberDropdown.options.length);
            this.adjustRangeChange();
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
            if (target['options']) {
                this.element.querySelector(this.selectors.pageStart).innerHTML = target.options[target.selectedIndex].value;
                this.state.pageNumber.value = Number(target.options[target.selectedIndex].value);
                this.toggleNavigationButtons(target.selectedIndex, target.options.length);
                this.adjustRangeChange();
                this.emitEvent(this.events.eventPageNumber, { 'value': target['options'] ? target.options[target.selectedIndex].value : '' });
            }
        } else if (target && getClosest(target, this.selectors.PageItems)) { // PageItems Drop-Down change
            if (target['options']) {
                this.element.querySelector(this.selectors.rangeEnd).innerHTML = target.options[target.selectedIndex].value;
                this.createPageNumberOptions(this.selectors.PageNumber,
                    Number(this.state.totalItems),
                    target.options[target.selectedIndex].value,
                    false);
                this.state.pageItems.value = Number(target.options[target.selectedIndex].value);
                this.adjustRangeChange();
                this.resetNavigationButtons();
                this.emitEvent(this.events.eventPageItems, { 'value': target['options'] ? target.options[target.selectedIndex].value : '' });
                this.emitEvent(this.events.eventPageNumber, { 'value': target['options'] ? target.options[target.selectedIndex].value : '' });
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

    createPageItemsDropDown = () => {
        const { itemstepper } = this.state;
        const wrapper = this.element.querySelector(`${this.selectors.leftSection} ${this.selectors.selectWrapper}`);
        const arrayItems = [itemstepper], limit = Number(this.string.pageItemsLimit);

        for (let i = 1; i <= limit; i++) {
            if (arrayItems[i - 1] * 2 > limit) {
                break;
            }
            arrayItems.push(arrayItems[i - 1] * 2);
        }

        //Create select and append options
        let select = document.createElement("select");
        select.classList.add(`${PREFIX}-pagination-select`, `${PREFIX}-page-items`);

        for (let i = 0; i < arrayItems.length; i++) {
            let option = document.createElement("option");
            option.value = arrayItems[i];
            option.text = arrayItems[i];
            select.appendChild(option);
        }
        wrapper.appendChild(select);
        wrapper.insertAdjacentHTML('beforeend', this.string.dropdownsvg);
        this.createPageNumberOptions(this.selectors.PageNumber,
            this.state.totalItems,
            select.options[select.selectedIndex].value,
            true);
    }

    createPageNumberOptions = (selector, totalItems, selectedValue, INITIALIZE) => {
        if (INITIALIZE) {
            const wrapper = this.element.querySelector(`${this.selectors.rightSection} ${this.selectors.selectWrapper}`);
            let select = document.createElement("select");
            select.classList.add(`${PREFIX}-pagination-select`, `${PREFIX}-page-number`);
            wrapper.appendChild(select);
            wrapper.insertAdjacentHTML('beforeend', this.string.dropdownsvg);
        }
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
            this.state.pageNumber.value = 1;
        }
    }

    attachEvents = () => {
        const pageForward = this.element.querySelector(this.selectors.next);
        const PageBackward = this.element.querySelector(this.selectors.previous);
        const pageNumber = this.element.querySelector(this.selectors.PageNumber);
        const pageItems = this.element.querySelector(this.selectors.PageItems);
        pageForward.addEventListener('click', this.handleNavigation);
        PageBackward.addEventListener('click', this.handleNavigation);
        pageNumber.addEventListener('change', this.handleChange);
        pageItems.addEventListener('change', this.handleChange);
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
                    itemstepper: 10,
                    totalItems: 0,
                };

                if (getClosest(target, `.${PREFIX}-pagination-button-next`)) {
                    defaultOption['navigationButton'] = { clicked: true, which: 'next' };
                } else if (getClosest(target, `.${PREFIX}-pagination-button-previous`)) {
                    defaultOption['navigationButton'] = { clicked: true, which: 'previous' };
                } else if (getClosest(target, `.${PREFIX}-pagination-select.${PREFIX}-page-number`)) {
                    defaultOption['pageNumber'] = { clicked: true, value: 1 };
                } else if (getClosest(target, `.${PREFIX}-pagination-select.${PREFIX}-page-items`)) {
                    defaultOption['pageItems'] = { clicked: true, value: 10 };
                }

                if (element.hasAttribute("data-totalitems")) {
                    defaultOption['totalItems'] = Number(element.dataset.totalitems);
                }

                if (element.hasAttribute("data-itemstepper")) {
                    defaultOption['itemstepper'] = Number(element.dataset.itemstepper);
                    defaultOption['pageItems'] = { clicked: true, value: Number(element.dataset.itemstepper) };
                }

                return new Pagination(element, {
                    ...defaultOption
                });
            }
        });
    }
}
export default Pagination;