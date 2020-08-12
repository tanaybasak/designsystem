window.patron.overflow('#dataTableOverflow', {
  attachElementToBody: true,
  scrollListner: true,
  onChange: e => {
    console.log(e.currentTarget);
  }
});
window.patron.overflow('#dataTableOverflow2', {
  attachElementToBody: true,
  scrollListner: true,
  onChange: e => {
    console.log(e.currentTarget);
  }
});
