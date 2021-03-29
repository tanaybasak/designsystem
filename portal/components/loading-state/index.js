const loadingstate = {
  heading: 'Loading-state',
  cssDocumentation: [
    { name: '.hcl-loading', description: 'add loading state for the component' }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Accordion',
      template: require('./accordion.html')
    },

    {
      subHeading: 'Breadcrumb',
      template: require('./breadcrumb.html')
    },

    {
      subHeading: 'DataTable',
      template: require('./dataTable.html')
    },

    {
      subHeading: 'Normal',
      template: require('./normal.html')
    },

    {
      subHeading: 'NumberInput',
      template: require('./numberInput.html')
    },

    {
      subHeading: 'Slider',
      template: require('./slider.html')
    },

    {
      subHeading: 'Tab',
      template: require('./tab.html')
    },

    {
      subHeading: 'Tag',
      template: require('./tag.html')
    }
  ]
};
export default loadingstate;
