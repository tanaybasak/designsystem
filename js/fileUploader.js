import { PREFIX } from './utils/config';

class FileUploader {
  constructor(element) {
    this.element = element;
    this.selectors = {
      input: `.${PREFIX}-file-input`,
      button: `.${PREFIX}-file-btn`
    };
  }

  keyListener = event => {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.element.querySelector(this.selectors.input).click();
    }
  };

  attachEvents = () => {
    const fileButton = this.element.querySelector(this.selectors.button);
    if (fileButton) {
      fileButton.addEventListener('keypress', this.keyListener.bind(this));
    }
  };
}
export default FileUploader;
