const notification = {
  heading: 'Notification',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Danger',
      template: require('./danger.html')
    },

    {
      subHeading: 'Info',
      template: require('./info.html')
    },

    {
      subHeading: 'Success',
      template: require('./success.html')
    },

    {
      subHeading: 'Warning',
      template: require('./warning.html')
    }
  ]
};
export default notification;
