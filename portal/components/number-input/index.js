const numberinput = {
  heading: 'Number Input',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'DisabledNumberInput',
      template: require('./disabledNumberInput.html'),
      trigger: () => {
        window.patron.numberInput('#hcl-disabled-number-input');
      }
    },

    {
      subHeading: 'NumberInput',
      template: require('./numberInput.html'),
      trigger: () => {
        window.patron.numberInput('#hcl-number-input');
      }
    },

    {
      subHeading: 'OptionalHelperNumberInput',
      template: require('./optionalHelperNumberInput.html'),
      trigger: () => {
        window.patron.numberInput('#hcl-optional-number-input');
      }
    },

    {
      subHeading: 'ValidationNumberInput',
      template: require('./validationNumberInput.html'),
      trigger: () => {
        window.patron.numberInput('#hcl-valid-number-input');
      }
    }
  ]
};
export default numberinput;
