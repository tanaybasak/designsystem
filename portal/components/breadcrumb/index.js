const breadcrumb = {
  heading: 'Breadcrumb',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Default',
      template: require('./default.html'),
      trigger: () => {
        window.patron.breadcrumb('#breadcrumb');
      }
    },

    {
      subHeading: 'Withoverflow',
      template: require('./withoverflow.html'),
      trigger: () => {
        window.patron.breadcrumb('#breadcrumb-withoverflow');
        window.patron.overflow('#breadcrumb-overflow-menu', {
          onChange: () => {}
        });
      }
    }
  ]
};
export default breadcrumb;
