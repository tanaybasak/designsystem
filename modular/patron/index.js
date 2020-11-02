import './index.scss';
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
import Overflow from '../../js/overflow';
import Tag from '../../js/tag';
import Modal from '../../js/modal';
import Breadcrumb from '../../js/breadcrumb';
import Tile from '../../js/tile';
import Toggle from '../../js/toggle';
import TimePicker from '../../js/timePicker';
import Overlay from '../../js/overlay';
import { isElement } from '../../js/utils/dom';
//import cssVars from 'css-vars-ponyfill';

// Demo Scripts
import '../../js/toast';
// cssVars({
//   rootElement: document // default
// });
const ComponentList = {
  dropdow: Dropdown,
  overflow: Overflow,
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
  modal: Modal,
  breadcrumb: Breadcrumb,
  tile: Tile,
  toggle: Toggle,
  timePicker: TimePicker,
  overlay: Overlay
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
  dropdown: function (selector, options) {
    attachElements(selector, options, Dropdown);
  },
  overflow: function (selector, options) {
    attachElements(selector, options, Overflow);
  },
  tabs: function (selector, options) {
    attachElements(selector, options, Tabs);
  },
  tooltip: function (selector, options) {
    attachElements(selector, options, Tooltip);
  },
  sidebar: function (selector, options) {
    attachElements(selector, options, Sidebar);
  },
  search: function (selector, options) {
    attachElements(selector, options, Search);
  },
  datepicker: function (selector, options) {
    attachElements(selector, options, DatePicker);
  },
  numberInput: function (selector, options) {
    attachElements(selector, options, NumberInput);
  },
  contentswitch: function (selector, options) {
    attachElements(selector, options, ContentSwitcher);
  },
  accordion: function (selector, options) {
    attachElements(selector, options, Accordion);
  },
  slider: function (selector, options) {
    attachElements(selector, options, Slider);
  },
  tree: function (selector) {
    attachElements(selector, null, Tree);
  },
  dataTable: function (selector) {
    attachElements(selector, null, DataTable);
  },
  fileUploader: function (selector, options) {
    attachElements(selector, options, FileUploader);
  },
  tag: function (selector) {
    attachElements(selector, null, Tag);
  },
  modal: function (selector, options) {
    attachElements(selector, options, Modal);
  },
  breadcrumb: function (selector) {
    attachElements(selector, null, Breadcrumb);
  },
  tile: function (selector) {
    attachElements(selector, null, Tile);
  },
  toggle: function (selector) {
    attachElements(selector, null, Toggle);
  },
  pagination: function (selector, options) {
    attachElements(selector, options, Pagination);
  },
  password: function (selector, options) {
    attachElements(selector, options, Password);
  },
  timePicker: function (selector, options) {
    attachElements(selector, options, TimePicker);
  },
  overlay: function (selector, options) {
    attachElements(selector, options, Overlay);
  }
};

if (window) {
  window.patron = { ...window.patron, ...components };
}

// eslint-disable-next-line no-undef
export default patron;
