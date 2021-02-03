const timepicker = {
  heading: 'Time-picker',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Default',
      template: require('./default.html'),
      trigger: () => {
        window.patron.timePicker('#timepicker-default');
      }
    },

    {
      subHeading: 'With-24H',
      template: require('./with-24H.html'),
      trigger: () => {
        window.patron.timePicker('#timepicker-24H', { type: 'HH' });
      }
    },

    {
      subHeading: 'With-timezone',
      template: require('./with-timezone.html'),
      trigger: () => {
        window.patron.timePicker('#timepicker-timezone');
      }
    }
  ]
};
export default timepicker;
