import { PREFIX } from './utils/config';
import handleDataBinding from './utils/data-api';
import getClosest from './utils/get-closest';

class Pagination {
  constructor(element, options) {
    this.element = element;
    this.selectors = {
      next: `.${PREFIX}-pagination-button-next`,
      previous: `.${PREFIX}-pagination-button-previous`,
      PageNumber: `.${PREFIX}-pagination-select.${PREFIX}-page-number`,
      PageItems: `.${PREFIX}-pagination-select.${PREFIX}-page-items`,
      pageStart: `.${PREFIX}-page-start`,
      pageEnd: `.${PREFIX}-page-end`,
      rangeStart: `.${PREFIX}-range-start`,
      rangeEnd: `.${PREFIX}-range-end`,
      totalitems: `.${PREFIX}-pagination-totalitems`,
      leftSection: `.${PREFIX}-pagination-left`,
      rightSection: `.${PREFIX}-pagination-right`,
      selectWrapper: `.${PREFIX}-pagination-select-wrapper`
    };

    this.events = {
      eventPageChange: 'pageChange',
      eventPageNumber: 'pageNumber',
      eventPageItems: 'itemsPerPage'
    };

    this.buttons = {
      NEXT: 'next',
      PREVIOUS: 'previous'
    };

    this.string = {
      dropdownsvg: `<svg class='${PREFIX}-select-arrow' width='10' height='5' viewBox='0 0 10 5'>
                            <path d='M0 0l5 4.998L10 0z' fill-rule='evenodd'></path>
                          </svg>`,
      pageItemsLimit: 100
    };

    this.state = {
      navigationButton: {
        clicked: false,
        which: this.buttons.NEXT
      },
      pageNumber: {
        clicked: false,
        value: 1
      },
      pageItems: {
        clicked: false,
        value: 10
      },
      totalItems: 0,
      ...options
    };
    this.init();
    this.toggleState(this.state);
  }

  init = () => {
    this.createPageItemsDropDown();
    this.element.querySelector(
      this.selectors.totalitems
    ).innerHTML = this.state.totalItems;
    const pageItemsDropDown = this.element.querySelector(
      this.selectors.PageItems
    );
    const pageNumberDropDown = this.element.querySelector(
      this.selectors.PageNumber
    );
    this.element.querySelector(this.selectors.rangeStart).innerHTML = 1;
    this.element.querySelector(this.selectors.pageStart).innerHTML = 1;
    this.element.querySelector(this.selectors.rangeEnd).innerHTML =
      pageItemsDropDown.options[pageItemsDropDown.selectedIndex].value;
    this.element.querySelector(this.selectors.pageEnd).innerHTML =
      pageNumberDropDown.options[pageNumberDropDown.options.length - 1].value;
  };

  toggleState = state => {
    const {
      clicked: navigationClicked = false,
      which
    } = state.navigationButton;
    const { clicked: pageNumberClicked = false } = state.pageNumber;
    const { clicked: pageItemsClicked = false } = state.pageItems;
    const pageNumberDropdown = this.element.querySelector(
      this.selectors.PageNumber
    );
    const pageItemsDropdown = this.element.querySelector(
      this.selectors.PageItems
    );
    if (navigationClicked) {
      if (which === this.buttons.NEXT) {
        this.state.pageNumber.value++;
        pageNumberDropdown.selectedIndex++;
      } else if (which === this.buttons.PREVIOUS) {
        this.state.pageNumber.value--;
        pageNumberDropdown.selectedIndex--;
      }
      this.toggleNavigationButtons(
        pageNumberDropdown.selectedIndex,
        pageNumberDropdown.options.length
      );
      this.adjustRangeChange();
      this.emitEvent(this.events.eventPageChange, { direction: which });
    }
    if (pageNumberClicked) {
      this.state.pageNumber.value = Number(
        pageNumberDropdown.options[pageNumberDropdown.selectedIndex].value
      );
    }
    if (pageItemsClicked) {
      this.state.pageItems.value = Number(
        pageItemsDropdown.options[pageItemsDropdown.selectedIndex].value
      );
    }
  };

  emitEvent = (evtName, takedetail) => {
    const event = new CustomEvent(`${evtName}`, {
      bubbles: true,
      cancelable: true,
      detail: takedetail
    });

    this.element.dispatchEvent(event);
  };

  adjustRangeChange = () => {
    const { value: pageNumber } = this.state.pageNumber;
    const rangeStart = this.element.querySelector(this.selectors.rangeStart);
    const rangeEnd = this.element.querySelector(this.selectors.rangeEnd);
    rangeStart.innerHTML = (pageNumber - 1) * this.state.pageItems.value + 1;
    if (pageNumber * this.state.pageItems.value > this.state.totalItems) {
      rangeEnd.innerHTML = this.state.totalItems;
    } else {
      rangeEnd.innerHTML = pageNumber * this.state.pageItems.value;
    }
  };

  next = selector => {
    const nextButton = this.element.querySelector(selector);
    const totalPages = this.getPages();
    if (
      nextButton &&
      !nextButton.disabled &&
      totalPages !== this.state.pageNumber.value
    ) {
      const pageNumberDropdown = this.element.querySelector(
        this.selectors.PageNumber
      );
      pageNumberDropdown.selectedIndex++;
      this.state.pageNumber.value++;
      this.toggleNavigationButtons(
        pageNumberDropdown.selectedIndex,
        pageNumberDropdown.options.length
      );
      this.adjustRangeChange();
      this.emitEvent(this.events.eventPageChange, {
        direction: this.buttons.NEXT
      });
    }
  };

  previous = selector => {
    const previousButton = this.element.querySelector(selector);

    if (
      previousButton &&
      !previousButton.disabled &&
      this.state.pageNumber.value > 1
    ) {
      const pageNumberDropdown = this.element.querySelector(
        this.selectors.PageNumber
      );
      pageNumberDropdown.selectedIndex--;
      this.state.pageNumber.value--;
      this.toggleNavigationButtons(
        pageNumberDropdown.selectedIndex,
        pageNumberDropdown.options.length
      );
      this.adjustRangeChange();
      this.emitEvent(this.events.eventPageChange, {
        direction: this.buttons.PREVIOUS
      });
    }
  };

  handleNavigation = e => {
    // Next & Previous Button Click
    const { target } = e;
    e.preventDefault();
    if (target && getClosest(target, this.selectors.next)) {
      this.next(this.selectors.next);
    } else if (target && getClosest(target, this.selectors.previous)) {
      this.previous(this.selectors.previous);
    }
  };

  handleKeydown = e => {
    const { target } = e;
    const keycode = e.keycode || e.which;
    const optionsLen = target.options.length;
    if (keycode === 37) { // PREVIOUS
      e.preventDefault();
      const selIndex = target.selectedIndex;
      if (selIndex > 0) { // OTHER THAN FIRST ELEMENT
        target.selectedIndex--;
      }
      this.handleChange(e);
    } else if (keycode === 39) { // NEXT
      e.preventDefault();
      if (target.options) {
        const selIndex = target.selectedIndex;
        if ((optionsLen - 1) !== selIndex) { // OTHER THAN LAST ELEMENT
          target.selectedIndex++;
        }
        this.handleChange(e);
      }
    }
  }

  handleChange = e => {
    // Drop-Down Change
    const { target } = e;
    e.preventDefault();
    if (target && getClosest(target, this.selectors.PageNumber)) {
      // PageNumber Drop-Down change
      if (target.options) {
        this.element.querySelector(this.selectors.pageStart).innerHTML =
          target.options[target.selectedIndex].value;
        this.state.pageNumber.value = Number(
          target.options[target.selectedIndex].value
        );
        this.toggleNavigationButtons(
          target.selectedIndex,
          target.options.length
        );
        this.adjustRangeChange();
        this.emitEvent(this.events.eventPageNumber, {
          value: target.options
            ? target.options[target.selectedIndex].value
            : ''
        });
      }
    } else if (target && getClosest(target, this.selectors.PageItems)) {
      // PageItems Drop-Down change
      if (target.options) {
        this.element.querySelector(this.selectors.rangeEnd).innerHTML =
          target.options[target.selectedIndex].value;
        this.createPageNumberOptions(
          this.selectors.PageNumber,
          Number(this.state.totalItems),
          target.options[target.selectedIndex].value,
          false
        );
        this.state.pageItems.value = Number(
          target.options[target.selectedIndex].value
        );
        this.adjustRangeChange();
        this.resetNavigationButtons();
        this.emitEvent(this.events.eventPageItems, {
          value: target.options
            ? target.options[target.selectedIndex].value
            : ''
        });
        this.emitEvent(this.events.eventPageNumber, {
          value: target.options
            ? target.options[target.selectedIndex].value
            : ''
        });
      }
    }
  };

  resetNavigationButtons = () => {
    const nextButton = this.element.querySelector(this.selectors.next);
    const previousButton = this.element.querySelector(this.selectors.previous);
    nextButton.disabled = false;
    previousButton.disabled = true;
  };

  toggleNavigationButtons = (selectedIndex, optionsLength) => {
    const nextButton = this.element.querySelector(this.selectors.next);
    const previousButton = this.element.querySelector(this.selectors.previous);
    let nextIndex = selectedIndex;
    nextIndex++;

    if (selectedIndex === 0) {
      // First Index
      previousButton.disabled = true;
      nextButton.disabled = false;
    } else if (nextIndex === optionsLength) {
      // Last Index
      nextButton.disabled = true;
      previousButton.disabled = false;
    } else {
      // Enable Navigation Buttons
      nextButton.disabled = false;
      previousButton.disabled = false;
    }
    const pageNumberDropDown = this.element.querySelector(
      this.selectors.PageNumber
    );
    this.element.querySelector(this.selectors.pageStart).innerHTML =
      pageNumberDropDown.options[pageNumberDropDown.selectedIndex].value;
  };

  getPages = () => {
    const pageItemsSelected = this.element.querySelector(
      this.selectors.PageItems
    );

    if (pageItemsSelected && this.state.totalItems) {
      return Math.ceil(
        this.state.totalItems /
          pageItemsSelected.options[pageItemsSelected.selectedIndex].value
      );
    }
  };

  createPageItemsDropDown = () => {
    const { value: itemstepper } = this.state.pageItems;
    const wrapper = this.element.querySelector(
      `${this.selectors.leftSection} ${this.selectors.selectWrapper}`
    );
    const arrayItems = [itemstepper];
    const limit = Number(this.string.pageItemsLimit);

    for (let i = 1; i <= limit; i++) {
      if (arrayItems[i - 1] * 2 > limit) {
        break;
      }
      arrayItems.push(arrayItems[i - 1] * 2);
    }

    // Create select and append options
    const select = document.createElement('select');
    select.classList.add(`${PREFIX}-pagination-select`, `${PREFIX}-page-items`);

    for (let i = 0; i < arrayItems.length; i++) {
      const option = document.createElement('option');
      option.value = arrayItems[i];
      option.text = arrayItems[i];
      select.appendChild(option);
    }
    wrapper.appendChild(select);
    wrapper.insertAdjacentHTML('beforeend', this.string.dropdownsvg);
    this.createPageNumberOptions(
      this.selectors.PageNumber,
      this.state.totalItems,
      select.options[select.selectedIndex].value,
      true
    );
  };

  createPageNumberOptions = (
    selector,
    totalItems,
    selectedValue,
    INITIALIZE
  ) => {
    if (INITIALIZE) {
      const wrapper = this.element.querySelector(
        `${this.selectors.rightSection} ${this.selectors.selectWrapper}`
      );
      const select = document.createElement('select');
      select.classList.add(
        `${PREFIX}-pagination-select`,
        `${PREFIX}-page-number`
      );
      wrapper.appendChild(select);
      wrapper.insertAdjacentHTML('beforeend', this.string.dropdownsvg);
    }
    const pageNumberDropdown = this.element.querySelector(selector);

    while (pageNumberDropdown.firstChild) {
      pageNumberDropdown.removeChild(pageNumberDropdown.firstChild);
    }

    if (
      selectedValue &&
      totalItems &&
      !isNaN(selectedValue) &&
      !isNaN(totalItems)
    ) {
      const pages = this.getPages(totalItems, selectedValue);
      const array = Array.from({ length: pages }, (v, k) => k + 1);

      // Create and append the options
      for (var i = 0; i < array.length; i++) {
        var option = document.createElement('option');
        option.value = array[i];
        option.text = array[i];
        pageNumberDropdown.appendChild(option);
      }
      pageNumberDropdown.options[0].selected = true;
      this.element.querySelector(this.selectors.pageEnd).innerText = pages;
      this.element.querySelector(this.selectors.pageStart).innerText = 1;
      this.state.pageNumber.value = 1;
    }
  };

  attachEvents = () => {
    const pageForward = this.element.querySelector(this.selectors.next);
    const PageBackward = this.element.querySelector(this.selectors.previous);
    const pageNumber = this.element.querySelector(this.selectors.PageNumber);
    const pageItems = this.element.querySelector(this.selectors.PageItems);
    pageForward.addEventListener('click', this.handleNavigation);
    PageBackward.addEventListener('click', this.handleNavigation);
    pageNumber.addEventListener('change', this.handleChange);
    pageNumber.addEventListener('keydown', this.handleKeydown);
    pageItems.addEventListener('change', this.handleChange);
    pageItems.addEventListener('keydown', this.handleKeydown);
  };

  static handleDataAPI = () => {
    handleDataBinding('pagination', function(element, target) {
      if (element && target) {
        const defaultOption = {
          navigationButton: {
            clicked: false,
            which: 'next'
          },
          pageNumber: {
            clicked: false,
            value: 1
          },
          pageItems: {
            clicked: false,
            value: 10
          },
          totalItems: 0
        };

        if (getClosest(target, `.${PREFIX}-pagination-button-next`)) {
          defaultOption.navigationButton = { clicked: true, which: 'next' };
        } else if (
          getClosest(target, `.${PREFIX}-pagination-button-previous`)
        ) {
          defaultOption.navigationButton = {
            clicked: true,
            which: 'previous'
          };
        } else if (
          getClosest(
            target,
            `.${PREFIX}-pagination-select.${PREFIX}-page-number`
          )
        ) {
          defaultOption.pageNumber = { clicked: true, value: 1 };
        } else if (
          getClosest(
            target,
            `.${PREFIX}-pagination-select.${PREFIX}-page-items`
          )
        ) {
          defaultOption.pageItems = { clicked: true, value: 10 };
        }

        if (
          element.hasAttribute('data-totalitems') &&
          element.dataset.totalitems !== ''
        ) {
          defaultOption.totalItems = Number(element.dataset.totalitems);
        } else {
          throw new Error('Require totalitems dataset.');
        }
        if (
          element.hasAttribute('data-itemstepper') &&
          element.dataset.itemstepper !== ''
        ) {
          defaultOption.pageItems = {
            clicked: true,
            value: Number(element.dataset.itemstepper)
          };
        } else {
          throw new Error('Require itemstepper dataset.');
        }

        return new Pagination(element, {
          ...defaultOption
        });
      }
    });
  };
}
export default Pagination;
