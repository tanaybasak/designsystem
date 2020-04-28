import { PREFIX } from './utils/config';

class Tile {
  constructor(element) {
    this.element = element;
  }

  keyDownOnTile = (e) => {
    const key = e.which || e.keyCode;
    const input = this.element.querySelector('input[type="checkbox"]');
    if (key === 13) {
      e.preventDefault();
      if (input) {
        input.checked = !input.checked;
      }
    }
  };

  attachEvents = () => {
    const expandable = this.element.querySelector(`.${PREFIX}-tile-arrow`);
    const selectable = this.element.querySelector(`.${PREFIX}-tile-selectable`);

    if (expandable) {
      expandable.addEventListener('keydown', (e) => {
        this.keyDownOnTile(e);
      });
    }
    if (selectable) {
      selectable.addEventListener('keydown', (e) => {
        this.keyDownOnTile(e);
      });
    } else {
      const link = this.element.querySelector(`#${PREFIX}-tile-clickTag`);
      this.element.addEventListener('keydown', () => {
        link.click();
      });
    }
  };
}
export default Tile;
