const datepicker = {
  heading: 'Date Picker',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Bottom',
      template: require('./bottom.html'),
      trigger: () => {
        window.patron.datepicker('#bottom-datepicker', {
          direction: 'bottom-right',
          scrollListner: true,
          attachElementToBody: true,
          onChange: () => {}
        });
      }
    },

    {
      subHeading: 'Top',
      template: require('./top.html'),
      trigger: () => {
        window.patron.datepicker('#top-datepicker', {
          direction: 'top-left',
          onChange: () => {}
        });
      }
    }
  ]
};
export default datepicker;
