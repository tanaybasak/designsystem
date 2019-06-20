import { PREFIX } from "./utils/config";

class Accordion {

    constructor(element, options) {
        this.element = element;
    }

    toggleContent = (event) => {
        const item = event.currentTarget.parentNode;
        if (item.classList.contains('expanded')) {
            item.classList.remove('expanded');
        } else {
            item.classList.add("expanded");
        }
    }
    attachEvents = () => {
        this.element.querySelectorAll(`.${PREFIX}-accordion-title`)
            .forEach((item, index) => {
                item.addEventListener("click", this.toggleContent);
            });
    }
}

export default Accordion;