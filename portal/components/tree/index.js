const tree = {
  heading: 'Tree',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Tree',
      template: require('./tree.html'),
      trigger: () => {
        window.patron.tree('.hcl-tree');
      }
    }
  ]
};
export default tree;
