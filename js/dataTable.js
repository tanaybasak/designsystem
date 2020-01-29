class DataTable {
  constructor(element) {
    this.element = element;
    this.sortableColumns = this.element.querySelectorAll('.sortable');
  }

  clickListener = event => {
    event.currentTarget.classList.toggle('desc');
  };

  keyListener = event => {
    if (event.keyCode === 13) {
      event.currentTarget.classList.toggle('desc');
    }
  };

  attachEvents = () => {
    if (this.sortableColumns && this.sortableColumns.length) {
      this.sortableColumns.forEach(column => {
        column.addEventListener('click', this.clickListener.bind(this));
        column.addEventListener('keypress', this.keyListener.bind(this));
      });
    }
  };
}
export default DataTable;
