import handleDataBinding from './utils/data-api';
import getClosest from './utils/get-closest';
import { PREFIX } from './utils/config';

class Search {
  constructor(element, options) {
    this.element = element;
    this.input = this.element.querySelector('input');
    this.searchIcon = this.element.querySelector(`.${PREFIX}-search-btn`);
    this.resetIcon = this.element.querySelector(`.${PREFIX}-search-reset`);

    if (options && options.openSearch) {
      this.showSearch();
    }
  }

  attachEvents() {
    if (this.element.classList.contains(`${PREFIX}-search-btn-only`)) {
      this.searchIcon.addEventListener('click', e => {
        this.showSearch(e);
      });
      this.input.addEventListener('blur', e => {
        this.onBlur(e);
      });
    }
    this.resetIcon.addEventListener('mousedown', e => {
      this.clearSearch(e);
    });
    this.input.addEventListener('input', e => {
      this.displayReset(e);
    });
  }

  showSearch(event) {
    if (event) event.preventDefault();
    this.element.classList.add('show');
    setTimeout(() => {
      this.input.focus();
    }, 200);
  }

  displayReset(e) {
    e.preventDefault();
    if (this.input.value !== '') {
      this.resetIcon.classList.add('show');
    } else {
      this.resetIcon.classList.remove('show');
    }
  }

  closeSearch() {
    this.element.classList.remove('show');
  }

  clearSearch(event) {
    event.preventDefault();
    this.input.value = '';
    this.resetIcon.classList.remove('show');
    this.input.focus();
  }

  onBlur() {
    if (this.input.value === '') {
      this.element.classList.remove('show');
    }
  }

  static handleDataAPI = () => {
    handleDataBinding('search', function(element, target) {
      let openSearch = false;
      const newTarget = getClosest(target, `.${PREFIX}-search-btn`);
      if (newTarget) {
        openSearch = true;
      }
      return new Search(element, { openSearch: openSearch });
    });
  };
}

export default Search;
