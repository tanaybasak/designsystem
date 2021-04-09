const select = {
  heading: 'Select',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Default',
      template: require('./default.html')
    },

    {
      subHeading: 'Group',
      template: require('./group.html')
    }
  ]
};
export default select;
