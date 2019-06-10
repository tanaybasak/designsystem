import delegate from "delegate";
import { NOOP } from "./functions";
import getClosest from "./get-closest";


function handleDataBinding(component, bind = NOOP) {
    delegate(`[data-component="${component}"]:not([data-init="${component}"])`, "click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        var target = event.target;
        var componentElement = getClosest(target, `[data-component="${component}"]`);
        componentElement.setAttribute("data-init", component);
        const componentInstance = bind(componentElement, target);
        if (componentInstance && typeof componentInstance.attachEvents === "function") {
            componentInstance.attachEvents();
        }
    })
}

export default handleDataBinding;