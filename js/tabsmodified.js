import { PREFIX } from "./utils/config";
import { NOOP } from "./utils/functions";
import { trackDocumentClick } from "./utils/dom";
import getCloset from "./utils/get-closest";
import handleDataBinding from "./utils/data-api";

class Tabs {
    constructor(element, options) {
        this.element = element;

        this.state = {
            selectedIndex: 0,
            onChange: NOOP
        };
    }

    static handleDataAPI = () => {
        handleDataBinding("tabs", function (element) {
            return new Tabs(element, { isOpen: true });
        })
    }
}

export default Tabs;