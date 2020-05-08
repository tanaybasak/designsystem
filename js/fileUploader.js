import { PREFIX } from './utils/config';
import { NOOP } from './utils/functions';

class FileUploader {
  constructor(element, options) {
    this.element = element;
    this.selectors = {
      input: `.${PREFIX}-file-input`,
      button: `.${PREFIX}-file-btn`,
      container: `.${PREFIX}-file-container`
    };
    this.state = {
      onChange: NOOP,
      ...options
    };
    this.fileContainer = this.element.querySelector(this.selectors.container);
    this.fileNames = [];
  }

  keyListener = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.element.querySelector(this.selectors.input).click();
    }
  };

  fileNameHTML = (name) => {
    return `<div class="${PREFIX}-file-container-item">
    <span class="${PREFIX}-file-selected-file">
      <p class="${PREFIX}-file-filename">${name}</p>
    </span>
    <button type='button' value="${name}" class='${PREFIX}-file-close'></button>
    </div>
    `;
  };

  getList = (event) => {
    const files = event.target.files;
    const length = event.target.files.length;
    if (files) {
      for (let i = 0; i < length; i++) {
        const string = this.fileNameHTML(files[i].name);
        this.fileContainer.insertAdjacentHTML('beforeend', string);
        this.fileNames.push(files[i].name);
      }
      this.fileNames = [...new Set(this.fileNames)];
    }
    if (typeof this.state.onChange === 'function') {
      this.state.onChange(this.fileNames);
    }
  };

  removeFile = (event) => {
    if (event.target.type === 'button') {
      this.fileContainer.removeChild(event.target.parentNode);
      const index = this.fileNames.indexOf(event.target.value);
      if (index !== -1) {
        this.fileNames.splice(index, 1);
      }
      if (typeof this.state.onChange === 'function') {
        this.state.onChange(this.fileNames);
      }
    }
  };

  attachEvents = () => {
    const fileButton = this.element.querySelector(this.selectors.button);
    const fileinput = this.element.querySelector(this.selectors.input);
    if (fileButton) {
      fileButton.addEventListener('keypress', this.keyListener.bind(this));
      fileinput.addEventListener('change', this.getList.bind(this));
      this.fileContainer.addEventListener('click', this.removeFile.bind(this));
    }
  };
}
export default FileUploader;
