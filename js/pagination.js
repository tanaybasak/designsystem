import { PREFIX } from "./utils/config";
import { NOOP } from "./utils/functions";
import handleDataBinding from "./utils/data-api";

class Pagination {
    constructor(element, options) {
        this.element = element;

    }

    static handleDataAPI = () => {
        handleDataBinding("tabs", function (element, target) {

        })
    }
}
export default Pagination;