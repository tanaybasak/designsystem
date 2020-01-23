import '../scss/main.scss';
import './modal';
import ContentSwitcher from './content-switcher';
import Dropdown from './dropdown';
import Navigation from './navigation';
import Search from './search';
import { isElement } from './utils/dom';
import Tabs from './tabs';
import Tooltip from './tooltip';
import DatePicker from './datePicker';
import NumberInput from './numberInput';
import Pagination from './pagination';
import Accordion from './accordion';
import Password from './password';
import Slider from './slider';
import Tree from './tree';
import FileUploader from './fileUploader';
const ComponentList = {
  dropdow: Dropdown,
  navigation: Navigation,
  search: Search,
  datepicker: DatePicker,
  tabs: Tabs,
  contentswitcher: ContentSwitcher,
  numberInput: NumberInput,
  pagination: Pagination,
  password: Password,
  accordion: Accordion,
  tree: Tree,
  fileUploader: FileUploader
};

for (const componentName in ComponentList) {
  if (Object.prototype.hasOwnProperty.call(ComponentList, componentName)) {
    const component = ComponentList[componentName];
    if (typeof component.handleDataAPI === 'function') {
      component.handleDataAPI();
    }
  }
}

const attachElements = (selector, options, Plugin) => {
  Array.from(document.querySelectorAll(selector)).forEach(element => {
    // Validate element type.
    if (isElement(element)) {
      const component = new Plugin(element, options);
      if (typeof component.attachEvents === 'function') {
        component.attachEvents(element);
      }
    } else {
      console.error('Invalid element provided.');
    }
  });
};

export const components = {
  dropdown: function(selector, options) {
    attachElements(selector, options, Dropdown);
  },
  tabs: function(selector, options) {
    attachElements(selector, options, Tabs);
  },
  tooltip: function(selector, options) {
    attachElements(selector, options, Tooltip);
  },
  navigation: function(selector, options) {
    attachElements(selector, options, Navigation);
  },
  search: function(selector, options) {
    attachElements(selector, options, Search);
  },
  datepicker: function(selector, options) {
    attachElements(selector, options, DatePicker);
  },
  numberInput: function(selector, options) {
    attachElements(selector, options, NumberInput);
  },
  contentswitch: function(selector, options) {
    attachElements(selector, options, ContentSwitcher);
  },
  accordion: function(selector, options) {
    attachElements(selector, options, Accordion);
  },
  slider: function(selector) {
    attachElements(selector, null, Slider);
  },
  tree: function(selector) {
    attachElements(selector, null, Tree);
  },
  fileUploader: function(selector) {
    attachElements(selector, null, FileUploader);
  }
};

if (window) {
  window.patron = components;
}

// eslint-disable-next-line no-undef
export default patron;
