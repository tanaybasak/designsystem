import { PREFIX } from "./utils/config";
import handleDataBinding from "./utils/data-api";
import getClosest from "./utils/get-closest";

class Pagination {
    constructor(element, options) {
        this.element = element;
        this.selectors = {
            PageForward: `.${PREFIX}-pagination-button-forward`,
            PageBackward: `.${PREFIX}-pagination-button-backward`,
        }

        this.events = {
            eventPageChange: 'pageChange'
        }

        this.buttons = {
            FORWARD: 'Forward',
            BACKWARD: 'Backward'
        }

        this.state = {
            navigationButton: { clicked: false, which: this.buttons.FORWARD },
            ...options
        }

        this.toggleState(this.state);
    }

    toggleState = (state) => {
        const { clicked, which } = state.navigationButton;
        if (clicked) {
            this.emitEvent(this.events.eventPageChange, { 'direction': which });
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
        if (target && getClosest(target, `.${PREFIX}-pagination-button-forward`)) {
            this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.FORWARD });
        } else if (target && getClosest(target, `.${PREFIX}-pagination-button-backward`)) {
            this.emitEvent(this.events.eventPageChange, { 'direction': this.buttons.BACKWARD });
        }
    }

    attachEvents = () => {
        const pageForward = this.element.querySelector(this.selectors.PageForward);
        const PageBackward = this.element.querySelector(this.selectors.PageBackward);
        pageForward.addEventListener('click', this.handleNavigation.bind(this));
        PageBackward.addEventListener('click', this.handleNavigation.bind(this));
    }

    static handleDataAPI = () => {
        handleDataBinding("pagination", function (element, target) {
            if (element && target) {

                let defaultOption = { navigationButton: { clicked: false, which: 'Forward' } };

                if (getClosest(target, `.${PREFIX}-pagination-button-forward`)) {
                    defaultOption['navigationButton'] = { clicked: true, which: 'Forward' };
                } else if (getClosest(target, `.${PREFIX}-pagination-button-backward`)) {
                    defaultOption['navigationButton'] = { clicked: true, which: 'Backward' };
                }

                return new Pagination(element, {
                    navigationButton: {
                        clicked: false,
                        which: 'Forward'
                    },
                    ...defaultOption
                });
            }
        });
    }
}
export default Pagination;