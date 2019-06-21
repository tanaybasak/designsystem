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
            rangeStart: `.${PREFIX}-range-start`,
            rangeEnd: `.${PREFIX}-range-end`
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
                value: 1
            },
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

    handleNavigation = (e) => {
        const { target } = e;
        e.preventDefault();
        if (target && getClosest(target, this.selectors.next)) {
            this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.NEXT });
        } else if (target && getClosest(target, this.selectors.previous)) {
            this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.PREVIOUS });
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
                this.element.querySelector(this.selectors.PageNumber).options[0].selected = true;
                this.emitEvent(this.events.eventPageNumber, { 'value': target['options'] ? target.options[target.selectedIndex].value : '' });
            }
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
                        value: 1
                    }
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

                return new Pagination(element, {
                    navigationButton: {
                        clicked: false,
                        which: 'next'
                    },
                    ...defaultOption
                });
            }
        });
    }
}
export default Pagination;