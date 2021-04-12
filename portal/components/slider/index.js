const slider = {
  heading: 'Slider',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Basic-slider',
      template: require('./basic-slider.html'),
      trigger: () => {
        window.patron.slider('#basic-slider');
      }
    },

    {
      subHeading: 'Slider-onhover-tooltip',
      template: require('./slider-onhover-tooltip.html'),
      trigger: () => {
        window.patron.slider('#slider-onhover-tooltip');
      }
    },

    {
      subHeading: 'Slider-with-textInput',
      template: require('./slider-with-textInput.html'),
      trigger: () => {
        window.patron.slider('#slider-input');
      }
    }
  ]
};
export default slider;
