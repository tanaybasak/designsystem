const header = {
  heading: 'Header',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Header',
      template: require('./header.html'),
      trigger: () => {
        window.patron.search('#header-search');
      }
    }
  ]
};
export default header;
