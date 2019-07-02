import { PREFIX } from "./utils/config";
import handleDataBinding from "./utils/data-api";
import getClosest from "./utils/get-closest";
import delegate from "delegate";

class Password {
    constructor(element, options) {
        this.element = element;
        this.selectors = {
            button: `.${PREFIX}-password-visibility`,
            visibilityoff: `.${PREFIX}-icon-visibility-off`,
            visibilityon: `.${PREFIX}-icon-visibility-on`,
        }

        this.state = {
            button: {
                clicked: false
            },
            ...options
        }

        this.toggleState();
    }

    toggleState = () => {
        let inputTag = this.element.parentElement.querySelector('input'),
            svgOff = this.element.querySelector(this.selectors.visibilityoff),
            svgOn = this.element.querySelector(this.selectors.visibilityon);

        if (this.state.button.clicked && inputTag && svgOff && svgOn) {
            this.toggle(inputTag, svgOff, svgOn);
        }
    }

    toggle = (inputTag, svgOff, svgOn) => {
        if (inputTag.type === "password") {
            inputTag.type = "text";
            svgOff.removeAttribute('hidden');
            svgOn.setAttribute("hidden", true);
        } else if (inputTag.type === "text") {
            inputTag.type = "password";
            svgOn.removeAttribute('hidden');
            svgOff.setAttribute("hidden", true);
        }
    }

    handleToggle = (e) => {
        let button = getClosest(e.target, `.${PREFIX}-password-visibility`),
            svgOff = button.querySelector(this.selectors.visibilityoff),
            svgOn = button.querySelector(this.selectors.visibilityon),
            inputTag = button.parentElement ? button.parentElement.querySelector('input') : null;

        if (button && svgOff && svgOn && inputTag) {
            this.toggle(inputTag, svgOff, svgOn);
        }
    }

    attachEvents = () => {
        delegate(`.${PREFIX}-password-visibility`, 'click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleToggle(e);
        }, false);
    }

    static handleDataAPI = () => {
        handleDataBinding("password", function (element, target) {
            if (element && target) {
                let defaultOption = {
                    button: {
                        clicked: false
                    }
                };
                if (getClosest(target, `.${PREFIX}-password-visibility`)) {
                    defaultOption['button'] = { clicked: true };
                }

                return new Password(element, {
                    ...defaultOption
                });
            }
        });
    }
}

export default Password;