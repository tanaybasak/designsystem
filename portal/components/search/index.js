const search = {
  heading: 'Search',
  cssDocumentation: [
    {
      name: '.hcl-search-sm',
      description: 'Selector for applying small search styles'
    },
    {
      name: '.hcl-bg-white',
      description:
        'Selector for applying white background in the search text field'
    },
    {
      name: '.hcl-search-btn-only',
      description: 'Selector for applying clickable/header search'
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Expandable',
      template: require('./expandable.html'),
      trigger: () => {
        window.patron.search('#expandable-search');
      }
    },

    {
      subHeading: 'Normal',
      template: require('./normal.html'),
      trigger: () => {
        window.patron.search('#normal-search');
      }
    }
  ]
};
export default search;
