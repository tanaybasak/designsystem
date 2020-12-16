import { PREFIX } from './utils/config';

class Tile {
  constructor(element) {
    this.element = element;
  }

  keyDownOnTile = e => {
    const key = e.which || e.keyCode;
    const input = this.element.querySelector('input[type="checkbox"]');
    const select = this.element.querySelector(`.${PREFIX}-tile-selectable`);
    if (key === 13 || key === 32) {
      e.preventDefault();
      if (input) {
        input.checked = !input.checked;
        if (select) {
          this.clickHandler();
        }
      }
    }
  };

  clickHandler = () => {
    const input = this.element.querySelector('input[type="checkbox"]');
    const select = this.element.querySelector(`.${PREFIX}-tile-selectable`);
    select && input.checked
      ? select.classList.add(`${PREFIX}-tile-active`)
      : select.classList.remove(`${PREFIX}-tile-active`);
  };

  attachEvents = () => {
    const expandable = this.element.querySelector(`.${PREFIX}-tile-arrow`);
    const selectable = this.element.querySelector(`.${PREFIX}-tile-selectable`);

    if (expandable) {
      expandable.addEventListener('keydown', e => {
        this.keyDownOnTile(e);
      });
    }
    if (selectable) {
      selectable.addEventListener('keydown', e => {
        this.keyDownOnTile(e);
      });
      selectable.addEventListener('click', () => {
        this.clickHandler();
      });
    } else {
      const anchor = this.element.querySelector('a');
      if (anchor) {
        this.element.addEventListener('keydown', () => {
          anchor.click();
        });
      }
    }
  };
}
export default Tile;
