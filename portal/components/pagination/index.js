const pagination = {
  heading: 'Pagination',
  cssDocumentation: [
    {
      name: '.hcl-pagination',
      description: `Wrapper class for the Component`
    },
    {
      name: '.hcl-pagination-left',
      description: `Left side Panel of the Pagination Component containing Items per Page & Total items data.`
    },
    {
      name: '.hcl-pagination-right',
      description: `Right side Panel of the Pagination Component containing No of Pages & Current Page data.`
    },
    {
      name: '.hcl-pagination-text',
      description: `For Holding text items of the Component.`
    },
    {
      name: '.hcl-pagination-range',
      description: `Pagination Range holder of the Component.`
    },
    {
      name: '.hcl-range-start',
      description: `Holder for Start Range of the Component.`
    },
    {
      name: '.hcl-range-end',
      description: `Holder for End Range of the Component.`
    },
    {
      name: '.hcl-pagination-button-previous',
      description: `Previous Button Class.`
    },
    {
      name: '.hcl-pagination-button-next',
      description: `Next Button Class.`
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [
    {
      name: 'pageChange',
      description:
        'Event which can be subscribed to the root component when there is change in Next/Previous Button is pressed.'
    },
    {
      description:
        'Event which can be subscribed to the root component when there is change in Page Number Dropdown.',
      name: 'pageNumber'
    },
    {
      name: 'itemsPerPage',
      description:
        'Event which can be subscribed to the root component when there is change in Items per Page Dropdown.'
    }
  ],
  variation: [
    {
      subHeading: 'Pagination',
      template: require('./pagination.html'),
      trigger: () => {
        window.patron.pagination('#pagination', {
          totalItems: 373,
          itemStepper: 20
        });
      }
    }
  ]
};
export default pagination;
