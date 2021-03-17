const overlay = {
  heading: 'Overlay',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'AttachToBody',
      template: require('./attachToBody.html'),
      trigger: () => {
        window.patron.overlay('#overlay2', {
          direction: 'top-left',
          attachElementToBody: true,
          scrollListner: true,
          onToggle: () => {}
        });
      }
    },

    {
      subHeading: 'Default',
      template: require('./default.html'),
      trigger: () => {
        window.patron.timePicker('#overlay-time-picker');
        window.patron.overlay('#overlay', {
          direction: 'top-left'
        });
      }
    }
  ]
};
export default overlay;
