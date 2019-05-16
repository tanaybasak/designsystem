(function () {
    var Tooltip = {
        init: function () {
            let createdDomElements = [];
            document.querySelectorAll('[data-tooltip]').forEach(elm => {
                let eventName = "mouseover";
                if (elm.hasAttribute("data-focus-on-click")) {
                    eventName = "click";
                }
                var type = elm.getAttribute('data-type') || "definition";
                var dataValue = elm.getAttribute('data-tooltip');
                if (dataValue.startsWith("#") && createdDomElements.indexOf(dataValue.substr(1)) === -1) {
                    createdDomElements.push(dataValue.substr(1))
                    let element = document.getElementById(dataValue.substr(1));
                    if (element) {
                        var tooltip = document.createElement("div");
                        tooltip.className = "hcl-tooltip hcl-tooltip-" + type;
                        tooltip.style.display = "none";
                        if (elm.hasAttribute("data-focus-on-click")) {
                            tooltip.setAttribute("data-focus-on-click", true);
                        }

                        var icon = document.createElement("div");
                        icon.className = "hcl-tooltip-arrow";
                        tooltip.appendChild(icon);
                        tooltip.appendChild(element);
                        document.body.appendChild(tooltip);
                    }
                }
                elm.addEventListener(eventName, (e) => {
                    var pos = e.currentTarget.getAttribute('data-direction') || "bottom";
                    var dataValue = e.currentTarget.getAttribute('data-tooltip');
                    var tooltip;
                    var icon;
                    if (type === 'definition') {
                        elm.className += " hcl-tooltip-dottedline";
                    }
                    if (dataValue.startsWith("#")) {
                        var content = document.getElementById(dataValue.substr(1));
                        tooltip = content.parentElement;
                        tooltip.style.display = "block";
                        icon = content.parentElement.children[0];
                    } else {
                        tooltip = document.createElement("div");
                        tooltip.className = "hcl-tooltip hcl-remove-tooltip hcl-tooltip-" + type;
                        if (eventName === 'click') {
                            tooltip.setAttribute("data-focus-on-click", true);
                        }
                        var icon = document.createElement("div");
                        icon.className = "hcl-tooltip-arrow";
                        var content = document.createElement("div");
                        content.innerHTML = dataValue;
                        tooltip.appendChild(icon);
                        tooltip.appendChild(content);
                        document.body.appendChild(tooltip);
                    }
                    this.tooltipDirection(e.currentTarget, tooltip, icon, pos, type)

                });
                elm.addEventListener("mouseout", function (e) {
                    var type = elm.getAttribute('data-type') || "definition";
                    if (type === 'definition') {
                        elm.classList.remove("hcl-tooltip-dottedline");
                    }
                    if (dataValue.startsWith("#")) {
                        var content = document.getElementById(elm.getAttribute('data-tooltip').substr(1));
                        content.parentElement.style.display = "none";
                    } else {
                        document.body.removeChild(document.querySelector(".hcl-remove-tooltip"));
                    }
                });
            });
        },
        tooltipDirection: function (parent, tooltip, icon, posHorizontal, type) {
            const dist = 10;
            var parentCoords = parent.getBoundingClientRect();
            let direction = this.getDirection(parentCoords, tooltip, dist, posHorizontal);
            icon.setAttribute("data-direction", direction);
            this.showTooltip(parentCoords, tooltip, icon, direction, dist, type)
        },
        getRem: function (value) {
            return (value / 16) + 'rem';
        },
        showTooltip: function (parentCoords, tooltip, icon, posHorizontal, dist, type) {
            let left = 0;
            let top = 0;
            let bottom = 0;
            let right = 0;
            let arrowSize = type === 'icon' ? 2.5 : 5;
            tooltip.removeAttribute("style");
            icon.removeAttribute("style");
            let offsetY = window.pageYOffset;
            let offsetX = window.pageXOffset;
            switch (posHorizontal) {
                case "left": {
                    left = parseInt(parentCoords.left) - dist - tooltip.offsetWidth;
                    top = (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 - tooltip.offsetHeight / 2;
                    bottom = (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 + (tooltip.offsetHeight / 2);
                    if (top < 0) {
                        top = 0;
                        tooltip.style.left = this.getRem(left + offsetX)
                        tooltip.style.top = this.getRem(top + offsetY)
                        icon.style.top = this.getRem(parentCoords.top + (parentCoords.height / 2) - arrowSize)
                    } else if (bottom > window.innerHeight) {
                        bottom = 0;
                        tooltip.style.left = this.getRem(left + offsetX)
                        tooltip.style.bottom = this.getRem(bottom - offsetY)
                        icon.style.bottom = this.getRem((window.innerHeight - (parentCoords.bottom - (parentCoords.height / 2))) - arrowSize);
                    } else {
                        tooltip.style.left = this.getRem(left + offsetX)
                        tooltip.style.top = this.getRem(top + offsetY)
                        icon.style.top = this.getRem(tooltip.offsetHeight / 2 - arrowSize)
                    }
                    break;
                }
                case "right": {
                    top = (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 - tooltip.offsetHeight / 2;
                    bottom = (parseInt(parentCoords.top) + parseInt(parentCoords.bottom)) / 2 + (tooltip.offsetHeight / 2);
                    left = parseInt(parentCoords.right) + dist;
                    if (top < 0) {
                        top = 0;
                        tooltip.style.left = this.getRem(left + offsetX)
                        tooltip.style.top = this.getRem(top + offsetY)
                        icon.style.top = this.getRem(parentCoords.top + (parentCoords.height / 2) - arrowSize)
                    } else if (bottom > window.innerHeight) {
                        bottom = 0;
                        tooltip.style.left = this.getRem(left + offsetX)
                        tooltip.style.bottom = this.getRem(bottom - offsetY)
                        icon.style.bottom = this.getRem((window.innerHeight - parentCoords.bottom + (parentCoords.height / 2)) - arrowSize)
                    } else {
                        tooltip.style.left = this.getRem(left + offsetX)
                        tooltip.style.top = this.getRem(top + offsetY)
                        icon.style.top = this.getRem(tooltip.offsetHeight / 2 - arrowSize)
                    }
                    break;
                }
                case "top": {
                    left = parseInt(parentCoords.left) + ((parentCoords.width - tooltip.offsetWidth) / 2);
                    right = parseInt(parentCoords.right) + ((tooltip.offsetWidth - parentCoords.width) / 2);
                    top = parseInt(parentCoords.top) - tooltip.offsetHeight - dist;
                    if (left < 0) {
                        left = 0;
                        tooltip.style.left = this.getRem(left + offsetX)
                        tooltip.style.top = this.getRem(top + offsetY)
                        icon.style.left = this.getRem((parentCoords.left + parentCoords.width / 2) - (arrowSize));
                    } else if (right > window.innerWidth) {
                        right = 0;
                        tooltip.style.right = this.getRem(right - offsetX)
                        tooltip.style.top = this.getRem(top + offsetY)
                        icon.style.right = this.getRem(((window.innerWidth - parentCoords.right) + (parentCoords.width / 2)) - (arrowSize))
                    } else {
                        tooltip.style.left = this.getRem(left + offsetX)
                        tooltip.style.top = this.getRem(top + offsetY)
                        icon.style.left = this.getRem((tooltip.offsetWidth / 2) - arrowSize);
                    }
                    break;
                }
                case "bottom": {
                    left = parseInt(parentCoords.left) + ((parentCoords.width - tooltip.offsetWidth) / 2);
                    right = parseInt(parentCoords.right) + ((tooltip.offsetWidth - parentCoords.width) / 2);
                    top = parseInt(parentCoords.bottom) + dist;
                    if (left < 0) {
                        left = 0;
                        tooltip.style.left = this.getRem(left + offsetX)
                        tooltip.style.top = this.getRem(top + offsetY)
                        icon.style.left = this.getRem((parentCoords.left + parentCoords.width / 2) - (arrowSize))
                    } else if (right > window.innerWidth) {
                        right = 0;
                        tooltip.style.right = this.getRem(right - offsetX)
                        tooltip.style.top = this.getRem(top + offsetY)
                        icon.style.right = this.getRem(((window.innerWidth - parentCoords.right) + (parentCoords.width / 2)) - (arrowSize))
                    } else {
                        tooltip.style.left = this.getRem(left + offsetX)
                        tooltip.style.top = this.getRem(top + offsetY)
                        icon.style.left = this.getRem((tooltip.offsetWidth / 2) - (arrowSize))
                    }
                    break;
                }
            }
        },

        getDirection: function (parentCoords, tooltip, dist, posHorizontal) {
            let newDirection = posHorizontal;
            switch (posHorizontal) {
                case "left": {
                    if ((parseInt(parentCoords.left) - dist - tooltip.offsetWidth) < 0) {
                        newDirection = "right";
                    }
                    break;
                }
                case "right": {
                    if ((parentCoords.right + dist + tooltip.offsetWidth) > window.innerWidth) {
                        newDirection = "left";
                    }
                    break;
                }
                case "top": {
                    if ((parseInt(parentCoords.top) - tooltip.offsetHeight - dist) < 0) {
                        newDirection = "bottom";
                    }
                    break;
                }
                case "bottom": {
                    if ((parseInt(parentCoords.bottom) + dist + tooltip.offsetHeight) > window.innerHeight) {
                        newDirection = "top";
                    }
                    break;
                }
            }
            return newDirection;
        }
    };
    Tooltip.init();

})();
