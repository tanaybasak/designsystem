const fileuploader = {
  heading: 'File-uploader',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'File-uploader',
      template: require('./file-uploader.html'),
      trigger: () => {
        window.patron.fileUploader('.hcl-file-uploader', {
          hideFile: false,
          onChange: () => {}
        });
      }
    }
  ]
};
export default fileuploader;
