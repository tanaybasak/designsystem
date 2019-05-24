import EventManager from './eventManager'
let commonElements = [];
let elementNo = 1;

class Tooltip {
    constructor(element) {
        this.element = element;
        this.eventName = element.hasAttribute('data-focus-on-click') ? 'click' : 'mouseover';
        this.type = element.getAttribute('data-type') || 'definition';
        this.dataValue = element.getAttribute('data-tooltip');
        this.direction = element.getAttribute('data-direction') || 'bottom';
        this.attachEvent(element)
    }

    attachEvent(elm) {
        if (this.dataValue.startsWith('#') && commonElements.indexOf(this.dataValue) === -1) {
            commonElements.push(this.dataValue)
            let element = document.getElementById(this.dataValue.substr(1));
            if (element) {
                var tooltip = document.createElement('div');
                tooltip.className = 'hcl-tooltip hcl-tooltip-' + this.type;
                tooltip.style.display = 'none';
                if (elm.hasAttribute('data-focus-on-click')) {
                    tooltip.setAttribute('data-focus-on-click', true);
                }
                var icon = document.createElement('div');
                icon.className = 'hcl-tooltip-arrow';
                tooltip.appendChild(icon);
                tooltip.appendChild(element);
                document.body.appendChild(tooltip);
            }
        }
        elm.addEventListener(this.eventName, (e) => { this.show(e) });
        if (this.eventName !== 'click') {
            elm.addEventListener('mouseout', (e) => { this.hide(e) })
        }
    }
    closeTooltip(e) {
        let element = document.getElementById(this.element.getAttribute('aria-describedby'));
        if (!e || !element.contains(e.target)) {
            if (element.classList.contains('hcl-remove-tooltip')) {
                document.body.removeChild(element);
            } else {
                element.classList.remove('hcl-tooltip-show');
                element.style.display = 'none';
            }
            EventManager.removeEvent('click');
            EventManager.removeEvent('scroll', true);
        }
    }
    show(e) {
        var tooltip;
        var icon;
        if (this.type === 'definition' && this.eventName !== 'click') {
            this.element.classList.add('hcl-tooltip-dottedline');
        }
        let elementId = 'tooltip-' + (elementNo++);
        this.element.setAttribute('aria-describedby', elementId)
        if (this.dataValue.startsWith('#')) {
            var content = document.getElementById(this.dataValue.substr(1));
            tooltip = content.parentElement;
            tooltip.setAttribute('id', elementId)
            tooltip.style.display = 'block';
            icon = content.parentElement.children[0];
        } else {
            tooltip = document.createElement('div');
            tooltip.setAttribute('id', elementId);
            tooltip.className = 'hcl-tooltip hcl-remove-tooltip hcl-tooltip-' + this.type;
            if (this.eventName === 'click') {
                tooltip.setAttribute('data-focus-on-click', true);
                tooltip.className += ' hcl-tooltip-show';
            }
            var icon = document.createElement('div');
            icon.className = 'hcl-tooltip-arrow';
            var content = document.createElement('div');
            content.innerHTML = this.dataValue;
            tooltip.appendChild(icon);
            tooltip.appendChild(content);
            document.body.appendChild(tooltip);
        }
        if (this.eventName === 'click') {
            tooltip.className += ' hcl-tooltip-show';
            EventManager.addEvent('click', (e) => { this.closeTooltip(e) });
            EventManager.addEvent('scroll', (e) => { this.updatePositionOnScroll(e) }, true);
        }
        this.tooltipDirection(this.element, tooltip, icon, this.direction, this.type);
        e.stopPropagation();
    }
    hide() {
        if (this.type === 'definition') {
            this.element.classList.remove('hcl-tooltip-dottedline');
        }
        if (this.dataValue.startsWith('#')) {
            var content = document.getElementById(this.dataValue.substr(1));
            content.parentElement.style.display = 'none';
        } else {
            document.body.removeChild(document.querySelector('.hcl-remove-tooltip'));
        }
    }
    tooltipDirection(parent, tooltip, icon, posHorizontal, type) {
        const dist = 10;
        var parentCoords = parent.getBoundingClientRect();
        let direction = this.getDirection(parentCoords, tooltip, dist, posHorizontal);
        icon.setAttribute('data-direction', direction);
        this.showTooltip(parentCoords, tooltip, icon, direction, dist, type)
    }
    getRem(value) {
        return (value / 16) + 'rem';
    }
    showTooltip(parentCoords, tooltip, icon, posHorizontal, dist, type) {
        let left = 0;
        let top = 0;
        let bottom = 0;
        let right = 0;
        let arrowSize = type === 'icon' ? 2.5 : 5;
        tooltip.removeAttribute('style');
        icon.removeAttribute('style');
        let offsetY = window.pageYOffset;
        let offsetX = window.pageXOffset;
        switch (posHorizontal) {
            case 'left': {
                left = parseInt(parentCoords.left) - dist - tooltip.offsetWidth;
                top = (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 - tooltip.offsetHeight / 2;
                bottom = (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 + (tooltip.offsetHeight / 2);
                if (top < 0) {
                    top = 0;
                    tooltip.style.top = this.getRem(top + offsetY)
                    icon.style.top = this.getRem(parentCoords.top + (parentCoords.height / 2) - arrowSize)
                } else if (bottom > window.innerHeight) {
                    bottom = 0;
                    tooltip.style.bottom = this.getRem(bottom - offsetY)
                    icon.style.bottom = this.getRem((window.innerHeight - (parentCoords.bottom - (parentCoords.height / 2))) - arrowSize);
                } else {
                    tooltip.style.top = this.getRem(top + offsetY)
                    icon.style.top = this.getRem(tooltip.offsetHeight / 2 - arrowSize)
                }
                tooltip.style.left = this.getRem(left + offsetX)
                break;
            }
            case 'right': {
                top = (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 - tooltip.offsetHeight / 2;
                bottom = (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 + (tooltip.offsetHeight / 2);
                left = parseInt(parentCoords.right) + dist;
                if (top < 0) {
                    top = 0;
                    tooltip.style.top = this.getRem(top + offsetY)
                    icon.style.top = this.getRem(parentCoords.top + (parentCoords.height / 2) - arrowSize)
                } else if (bottom > window.innerHeight) {
                    bottom = 0;
                    tooltip.style.bottom = this.getRem(bottom - offsetY)
                    icon.style.bottom = this.getRem((window.innerHeight - parentCoords.bottom + (parentCoords.height / 2)) - arrowSize)
                } else {
                    tooltip.style.top = this.getRem(top + offsetY)
                    icon.style.top = this.getRem(tooltip.offsetHeight / 2 - arrowSize)
                }
                tooltip.style.left = this.getRem(left + offsetX);
                break;
            }
            case 'top': {
                left = parseInt(parentCoords.left) + ((parentCoords.width - tooltip.offsetWidth) / 2);
                right = parseInt(parentCoords.right) + ((tooltip.offsetWidth - parentCoords.width) / 2);
                top = parseInt(parentCoords.top) - tooltip.offsetHeight - dist;
                if (left < 0) {
                    left = 0;
                    tooltip.style.left = this.getRem(left + offsetX)
                    icon.style.left = this.getRem((parentCoords.left + parentCoords.width / 2) - (arrowSize));
                } else if (right > window.innerWidth) {
                    right = 0;
                    tooltip.style.right = this.getRem(right - offsetX)
                    icon.style.right = this.getRem(((window.innerWidth - parentCoords.right) + (parentCoords.width / 2)) - (arrowSize))
                } else {
                    tooltip.style.left = this.getRem(left + offsetX)
                    icon.style.left = this.getRem((tooltip.offsetWidth / 2) - arrowSize);
                }
                tooltip.style.top = this.getRem(top + offsetY);
                break;
            }
            case 'top left': {
                left = parseInt(parentCoords.left);
                top = parseInt(parentCoords.top) - tooltip.offsetHeight - dist;
                tooltip.style.left = this.getRem(left + offsetX)
                tooltip.style.top = this.getRem(top + offsetY)
                icon.style.left = this.getRem((parentCoords.width / 2) - arrowSize);
                break;
            }
            case 'bottom': {
                left = parseInt(parentCoords.left) + ((parentCoords.width - tooltip.offsetWidth) / 2);
                right = parseInt(parentCoords.right) + ((tooltip.offsetWidth - parentCoords.width) / 2);
                top = parseInt(parentCoords.bottom) + dist;
                if (left < 0) {
                    left = 0;
                    tooltip.style.left = this.getRem(left + offsetX)
                    icon.style.left = this.getRem((parentCoords.left + parentCoords.width / 2) - (arrowSize))
                } else if (right > window.innerWidth) {
                    right = 0;
                    tooltip.style.right = this.getRem(right - offsetX)
                    icon.style.right = this.getRem(((window.innerWidth - parentCoords.right) + (parentCoords.width / 2)) - (arrowSize))
                } else {
                    tooltip.style.left = this.getRem(left + offsetX)
                    icon.style.left = this.getRem((tooltip.offsetWidth / 2) - (arrowSize))
                }
                tooltip.style.top = this.getRem(top + offsetY);
                break;
            }
            case 'bottom left': {
                left = parseInt(parentCoords.left);
                top = parseInt(parentCoords.bottom) + dist;
                tooltip.style.left = this.getRem(left + offsetX)
                tooltip.style.top = this.getRem(top + offsetY)
                icon.style.left = this.getRem((parentCoords.width / 2) - arrowSize);
                break;
            }
        }
    }
    getDirection(parentCoords, tooltip, dist, posHorizontal) {
        let newDirection = posHorizontal;
        switch (posHorizontal) {
            case 'left': {
                if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                    newDirection = 'right';
                    if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                        newDirection = 'top';
                        if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                            newDirection = 'bottom';
                            if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                                newDirection = posHorizontal;
                            }
                        }
                    }
                }
                break;
            }
            case 'right': {
                if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                    newDirection = 'left';
                    if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                        newDirection = 'top';
                        if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                            newDirection = 'bottom';
                            if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                                newDirection = posHorizontal;
                            }
                        }
                    }
                }
                break;
            }
            case 'top': {
                if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                    newDirection = 'bottom';
                    if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                        newDirection = 'left';
                        if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                            newDirection = 'right';
                            if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                                newDirection = posHorizontal;
                            }
                        }
                    }
                }
                break;
            }
            case 'bottom': {
                if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                    newDirection = 'top';
                    if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                        newDirection = 'left';
                        if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                            newDirection = 'right';
                            if (this.isOutofBound(parentCoords, tooltip, dist, newDirection)) {
                                newDirection = posHorizontal;
                            }
                        }
                    }
                }
                break;
            }
        }
        return newDirection;
    }

    isOutofBound(parentCoords, tooltip, dist, posHorizontal) {
        let isOutofBound = false;
        switch (posHorizontal) {
            case 'left': {
                if ((parseInt(parentCoords.left) - dist - tooltip.offsetWidth) < 0) {
                    isOutofBound = true;
                }
                break;
            }
            case 'right': {
                if ((parentCoords.right + dist + tooltip.offsetWidth) > window.innerWidth) {
                    isOutofBound = true;
                }
                break;
            }
            case 'top': {
                if ((parseInt(parentCoords.top) - tooltip.offsetHeight - dist) < 0) {
                    isOutofBound = true;
                }
                break;
            }
            case 'bottom': {
                if ((parseInt(parentCoords.bottom) + dist + tooltip.offsetHeight) > window.innerHeight) {
                    isOutofBound = true;
                }
                break;
            }
        }
        return isOutofBound;

    }
    updatePositionOnScroll(e) {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                let newelement = document.getElementById(this.element.getAttribute('aria-describedby'));
                this.tooltipDirection(this.element, newelement, newelement.children[0], this.direction, this.type);
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
}
export default Tooltip;