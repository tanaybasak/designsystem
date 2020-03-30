import { PREFIX } from './utils/config';

class Tile {
  constructor(element) {
    this.element = element;
  }

  attachEvents = () => {
    this.element.addEventListener('keydown', e => {
      const input = this.element.querySelector('input[type="checkbox"]');
      const clickTag = this.element.querySelector(`#${PREFIX}-tile-clickTag`);
      const key = e.which || e.keyCode;
      if (key === 13 || key === 32) {
        if (input) {
          input.checked = !input.checked;
        }
        if (clickTag) {
          clickTag.click();
        }
      }
    });
  };
}
export default Tile;
