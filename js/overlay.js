import { PREFIX } from './utils/config';
import { addListener, removeListeners } from './eventManager';
import { getPositions } from './utils/overlayUtil';
let overlayRef = 0;
const overlayContents = {};
class Overlay {
  constructor(element, options) {
    this.element = element;

    this.overflowId = overlayRef++;

    this.targetElementSelector = element.getAttribute('data-target');
  }

  show = () => {
    const targetElement = document.querySelector(this.targetElementSelector);
    const elementInfo = targetElement.getBoundingClientRect();

    document.body.appendChild(targetElement);

    const positions = getPositions(
      'top-right',
      elementInfo.width,
      elementInfo.height,
      this.element
    );

    targetElement.style.top = positions.top;
    targetElement.style.left = positions.left;
    targetElement.classList.add('hcl-overlay-container-show');
    addListener(
      'overflowId-' + this.overflowId,
      'click',
      e => {
        this.closeOverlay(e);
      },
      true
    );
  };

  hide = e => {
    document
      .querySelector(this.targetElementSelector)
      .classList.remove('hcl-overlay-container-show');
    removeListeners('overflowId-' + this.overflowId, 'click');
  };

  closeOverlay = e => {
    const targetElement = document.querySelector(this.targetElementSelector);
    if (targetElement) {
      if (e && targetElement.contains(e.target)) {
        console.log('INSIDE container');
        return;
      }
      if (e && this.element && this.element.contains(e.target)) {
        console.log('INSIDE container');
        return;
      }
      this.hide();
    }
  };
  attachEvents = () => {
    console.log(
      'Attach Events',
      this.element,
      document.querySelector(this.targetElementSelector)
    );

    this.element.addEventListener('click', () => {
      this.show();
    });

    // let targetElement = null;
    // if (!overlayContents[this.targetElementSelector]) {
    //   targetElement = document.querySelector(this.targetElementSelector);
    // } else {
    //   targetElement = overlayContents[this.targetElementSelector];
    // }
  };
}

export default Overlay;
