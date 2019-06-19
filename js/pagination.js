import { PREFIX } from "./utils/config";
import handleDataBinding from "./utils/data-api";
import getClosest from "./utils/get-closest";

class Pagination {
    constructor(element, options) {
        this.element = element;
        this.selectors = {
            next: `.${PREFIX}-pagination-button-next`,
            previous: `.${PREFIX}-pagination-button-previous`,
            PageNumber: `.${PREFIX}-pagination-select.${PREFIX}-page-number`
        }

        this.events = {
            eventPageChange: 'pageChange',
            eventPageNumber: 'pageNumber',
        }

        this.buttons = {
            NEXT: 'next',
            PREVIOUS: 'previous'
        }

        this.state = {
            navigationButton: { clicked: false, which: this.buttons.NEXT },
            ...options
        }

        this.toggleState(this.state);
    }

    toggleState = (state) => {
        const { clicked, which } = state.navigationButton;
        const { clicked: pageNumberClicked = false } = state.pageNumber;
        if (clicked) {
            this.emitEvent(this.events.eventPageChange, { 'direction': which });
        }
        if (pageNumberClicked) {
            this.emitEvent(this.events.eventPageChange, { 'value': state.pageNumber.value });
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
            this.emitEvent(this.events.eventPageNumber, { 'value': target.options[target.selectedIndex].value });
        }
    }

    attachEvents = () => {
        const pageForward = this.element.querySelector(this.selectors.next);
        const PageBackward = this.element.querySelector(this.selectors.previous);
        const pageNumber = this.element.querySelector(this.selectors.PageNumber);
        pageForward.addEventListener('click', this.handleNavigation.bind(this));
        PageBackward.addEventListener('click', this.handleNavigation.bind(this));
        pageNumber.addEventListener('change', this.handleChange.bind(this));
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
                    itemsPerPage: 10
                };

                if (getClosest(target, `.${PREFIX}-pagination-button-next`)) {
                    defaultOption['navigationButton'] = { clicked: true, which: 'next' };
                } else if (getClosest(target, `.${PREFIX}-pagination-button-previous`)) {
                    defaultOption['navigationButton'] = { clicked: true, which: 'previous' };
                } else if (getClosest(target, `.${PREFIX}-pagination-select.${PREFIX}-page-number`)) {
                    defaultOption['pageNumber'] = { clicked: true };
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