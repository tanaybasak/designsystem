import handleDataBinding from "./utils/data-api";
import getClosest from "./utils/get-closest";

class NumberInput {

    constructor(element, options) {
        this.element = element;
        this.input = this.element.querySelector('input');
        if (options) {
            if (options.action === 'increment') {
                this.increment()
            } else if (options.action === 'decrement') {
                this.decrement()
            }
        }
    }

    attachEvents = () => {
        this.element.querySelector('.increment-btn').addEventListener('mousedown', (event) => { this.increment(event) })
        this.element.querySelector('.decrement-btn').addEventListener('mousedown', (event) => { this.decrement(event) })
    }

    increment = (event) => {
        if (event)
            event.preventDefault();
        try {
            this.input.stepUp();
        } catch (e) {
            this.stepUp(this.input.step === '' ? 1 : this.input.step);
        }
        this.focusElement();
    }

    decrement = (event) => {
        if (event)
            event.preventDefault();
        try {
            this.input.stepDown();
        } catch (e) {
            this.stepDown(this.input.step === '' ? 1 : this.input.step);
        }
        this.focusElement();
    }

    stepUp = (step) => {
        if (this.input.max !== '' && Number(this.input.max) < (Number(this.input.value) + Number(step))) {
            return;
        }
        this.input.value = Number(this.input.value) + Number(step);
    }
    stepDown = (step) => {
        if (this.input.min !== '' && Number(this.input.min) > (Number(this.input.value) - Number(step))) {
            return;
        }
        this.input.value = Number(this.input.value) - Number(step);
    }

    focusElement = () => {
        if (document.activeElement !== this.input) {
            this.input.focus();
        }
    }

    static handleDataAPI = () => {
        handleDataBinding("numberInput", function (element, target) {
            let action = undefined;
            let newTarget = getClosest(target, `.increment-btn`);
            if (!newTarget) {
                newTarget = getClosest(target, `.decrement-btn`);
                if (newTarget) {
                    action = 'decrement';
                }
            } else {
                action = 'increment';
            }
            return new NumberInput(element, { action: action });
        })
    }

}

export default NumberInput;
