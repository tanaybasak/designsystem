import { PREFIX } from './utils/config';

class FileUploader {
  constructor(element) {
    this.element = element;
    this.selectors = {
      input: `.${PREFIX}-file-input`,
      button: `.${PREFIX}-file-btn`,
      container: `.${PREFIX}-file-container`
    };
    this.fileContainer = this.element.querySelector(this.selectors.container);
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
    <button type='button' class='${PREFIX}-file-close'></button>
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
      }
    }
  };

  removeFile = (event) => {
    this.fileContainer.removeChild(event.target.parentNode);
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
