import '../../scss/main.scss';
import ContentSwitcher from '../../js/content-switcher';
import Dropdown from '../../js/dropdown';
import Sidebar from '../../js/sidebar';
import Search from '../../js/search';
import Tabs from '../../js/tabs';
import Tooltip from '../../js/tooltip';
import DatePicker from '../../js/datePicker';
import NumberInput from '../../js/numberInput';
import Pagination from '../../js/pagination';
import Accordion from '../../js/accordion';
import Password from '../../js/password';
import Slider from '../../js/slider';
import Tree from '../../js/tree';
import DataTable from '../../js/dataTable';
import FileUploader from '../../js/fileUploader';
import Tag from '../../js/tag';
import Modal from '../../js/modal';

import { isElement } from '../../js/utils/dom';

// Demo Scripts
import '../../js/toast';

const ComponentList = {
  dropdow: Dropdown,
  sidebar: Sidebar,
  search: Search,
  datepicker: DatePicker,
  tabs: Tabs,
  contentswitcher: ContentSwitcher,
  numberInput: NumberInput,
  pagination: Pagination,
  password: Password,
  accordion: Accordion,
  tree: Tree,
  dataTable: DataTable,
  fileUploader: FileUploader,
  tag: Tag,
  modal: Modal
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
  sidebar: function(selector, options) {
    attachElements(selector, options, Sidebar);
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
  dataTable: function(selector) {
    attachElements(selector, null, DataTable);
  },
  fileUploader: function(selector) {
    attachElements(selector, null, FileUploader);
  },
  tag: function(selector) {
    attachElements(selector, null, Tag);
  },
  modal: function(selector, options) {
    attachElements(selector, options, Modal);
  }
};

if (window) {
  window.patron = components;
}

// eslint-disable-next-line no-undef
export default patron;
