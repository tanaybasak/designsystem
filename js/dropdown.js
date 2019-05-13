(function () {
    const DROPDOWN_SELECTOR = '.hcl-dropdown .hcl-dropdown-toggle';
    const DROPDOWN_ITEM_SELECTOR = '.hcl-dropdown .hcl-dropdown-item';

    const dropdownElements = document.querySelectorAll(DROPDOWN_SELECTOR);
    const dropdownItemElements = document.querySelectorAll(DROPDOWN_ITEM_SELECTOR);

    if (dropdownElements) {
        dropdownElements.forEach(item => {
            item.addEventListener('click', event => {
                const _nextElementSibling = event.currentTarget.nextElementSibling;

                if (/show/i.test(_nextElementSibling.className)) {
                    _nextElementSibling.classList.remove('show');
                } else {
                    _nextElementSibling.classList.add('show');
                }

                const parent = getClosest(event.currentTarget, '.hcl-dropdown');

                if (parent) {
                    const parentElementClassName = parent.className;
                    const position = getPosition(parentElementClassName);
                    let { height } = _nextElementSibling.getBoundingClientRect();
                    if (position === 'top') {
                        height = (height + 2) * -1;
                    } else {
                        height = 42;
                    }

                    _nextElementSibling.style.transform = 'translate3d(0, ' + height + 'px, 0)';
                }
            });
        });
    }

    if (dropdownItemElements) {
        dropdownItemElements.forEach(item => {
            item.addEventListener('click', event => {
                const _currentTarget = event.currentTarget;
                const _value = _currentTarget.dataset.value;
                const _label = _currentTarget.textContent.trim();
                const parent = getClosest(_currentTarget, '.hcl-dropdown-container');
                if (parent) {
                    const _dropdownElement = parent.previousElementSibling;
                    if (_dropdownElement) {
                        _dropdownElement.setAttribute('data-value', _value);
                        _dropdownElement.innerHTML = _label;
                        parent.classList.remove('show');

                        const previouslySelectedElement = parent.querySelector('.hcl-dropdown-item.hcl-dropdown-item-selected');
                        if (previouslySelectedElement) {
                            previouslySelectedElement.classList.remove('hcl-dropdown-item-selected');
                        }
                        _currentTarget.classList.add('hcl-dropdown-item-selected');
                    }
                }
            });
        });
    }


    function getClosest(element, selector) {
        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function (s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) { }
                    return i > -1;
                };
        }

        // Get the closest matching element
        for (; element && element !== document; element = element.parentNode) {
            if (element.matches(selector)) return element;
        }
        return null;
    }

    function getPosition(_className) {
        switch (true) {
            case /droptop/i.test(_className):
                return 'top';
            case /dropright/i.test(_className):
                return 'right';
            case /dropbottom/i.test(_className):
                return 'bottom';
            case /dropleft/i.test(_className):
                return 'left';
            default:
                return 'bottom';
        }
    }
})();