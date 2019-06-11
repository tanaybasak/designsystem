import handleDataBinding from "./utils/data-api";
class NumberInput {

    constructor(element) {
        this.element = element;
        this.input = this.element.querySelector('input');
    }

    attachEvents = () => {
        //this.element.querySelector('.hcl-number-control').style.top = (this.input.getBoundingClientRect().top - this.element.getBoundingClientRect().top) + 'px';
        this.element.querySelector('.increment-btn').addEventListener('mousedown', (event) => { this.increment(event) })
        this.element.querySelector('.decrement-btn').addEventListener('mousedown', (event) => { this.decrement(event) })
    }

    increment = (event) => {
        event.preventDefault();
        try {
            this.input.stepUp();
        } catch (e) {
            this.stepUp(this.input.step === '' ? 1 : this.input.step);
        }
        this.focusElement();
    }

    decrement = (event) => {
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
        handleDataBinding("numberInput", function (element) {
            return new NumberInput(element);
        })
    }

}

export default NumberInput;
