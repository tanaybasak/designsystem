const slideout = {
  heading: 'Slideout',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Slideout',
      template: require('./default.html'),
      trigger: () => {
        window.patron.slideout('#hcl-btn-slideout-default', {
          closeOnEscape: true
        });
      }
    },
    {
      subHeading: 'Slideout-theme',
      template: require('./theme.html'),
      trigger: () => {
        window.patron.slideout('#hcl-btn-slideout-theme', {
          closeOnEscape: true
        });
      }
    }
  ]
};
export default slideout;
