- Add file is the default text that appears with the File Uploader.

- A File Uploader should always be accompanied by Submit or Upload, which is to be styled as a Primary Button. User clicks Submit or Upload to submit their data.

- Use an ellipsis (…) if the filename extends beyond the width of its parent element.

#### Interaction

- The action of clicking Add files will trigger a browser-specific upload window.

- Once the user chooses files to upload, the browser-specific upload window closes and the files will appear below the Add files button.

- User clicks Submit or Upload to submit their data.

- Any errors that may occur with the file should appear as an Inline Error Notification (LINK).

#### Uploading Files

Developers using File Uploader will be able to use JavaScript to inject a Loading component when selected files are actually being uploaded.

#### Removing Files

Developers will use JavaScript to inject a “Close” button on each file that is selected to be uploaded. It is up to the developer to code the logic for removing these files individually. However, keep in mind that this kind of editing isn’t supported natively in the browser.