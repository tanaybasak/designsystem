const accordion = {
  heading: 'Accordion',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Controlled',
      template: require('./controlled.html'),
      trigger: () => {
        window.patron.accordion('#con', {
          uncontrolled: false
        });
      }
    },

    {
      subHeading: 'Uncontrolled',
      template: require('./uncontrolled.html'),
      trigger: () => {
        window.patron.accordion('#unc', {
          uncontrolled: true
        });
      }
    }
  ]
};
export default accordion;
