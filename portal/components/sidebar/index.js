const sidebar = {
  heading: 'Sidebar',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Sidebar',
      template: require('./sidebar.html'),
      trigger: () => {
        window.patron.sidebar('.hcl-sidebar', {});
      }
    }
  ]
};
export default sidebar;
