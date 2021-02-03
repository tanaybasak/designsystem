const pagination = {
  heading: 'Pagination',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [
    { name: 'pageChange', description: '' },
    {
      name:
        'Event which can be subscribed to the root component when there is change in Next/Previous Button is pressed.',
      description: 'pageNumber'
    },
    { name: 'itemsPerPage', description: '' },
    {
      name:
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
