const fileuploader = {
  heading: 'File Uploader',
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
