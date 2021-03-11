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
        window.patron.sidebar('.hcl-demo-sidebar', { expanded: true });
      }
    }
  ]
};
export default sidebar;
