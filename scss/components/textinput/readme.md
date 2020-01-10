## Textinput

Text Input enable the user to input a few words. If you expect the user to input more than a sentence, use the Textarea component.

### default

Example of default

### Textinput with error

Example of textinput-with-error

### Textinput with helpertext

Example of textinput-with-helpertext

### General Guidelines

**Default values:** Where possible, add programmatic assistance. detect and pre-fill inputs to reduce errors and save time. When the software can’t determine the value that belongs in an input, use type-ahead to make suggestions. Use sentence-case for default values, detected values, and auto-completion text. 

**Validation and errors:** Real time validation helps to streamline the process and keep data clean when the user is filling out forms. 

                           - Validation 

                             - Validation appears when the user has clicked out of the field. 

                             - Validation disappears when the user has remedied the issue. 

                             - Validation text appears below the field and should be as informative as possible describing the issue. 

                           - Optional vs Required fields 

                             - Indicate optional fields with “(optional)” next to the label. Minimize the number of optional fields if possible. 

**Labels:** Effective labelling helps users understand what information needs to be entered into a Text Input. Using placeholder text in lieu of a label is sometimes employed as a space-saving method. However, this is not recommended because it hides context and presents accessibility issues. 

**Accessibility Best Practices for Labels:**

  - Labels must be visible when an input gets focus. 

  - Labels must be announced to the screen reader on focus. 

  - Ensure the helper text that appears under an input is read when an assistive technology user stops at an input using ARIA. 

  - Allow the user to manually input text without having to interact with the calendar widget.  

**Placeholder text:** Placeholder text provides hints or examples of what to enter. Placeholder text disappears after the user begins entering data into the Text Input and should not contain crucial information. Use sentence-style capitalization, and in most cases, write the text as a direct statement without punctuation. 

**Disabled state:** Textinput may appear in disabled state as per the workflow requirement. 

### Spec file

Text Input labels and placeholder text should be set in sentence case, with only the first word in a phrase and any proper nouns capitalized. Text Input labels should be three words or less. 

Spec file should be here.

### Documentation

##### HTML

For default

Snippet of default html

For textinput with error

Snippet of textinput-with-error html

For textinput with helpertext

Snippet of textinput-with-helpertext html

#### Classes

| Name              | Description                                                                                                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .hcl-form-control | Input Area has class .hcl-form-control with a &lt;label&gt; text next to it. &lt;br/&gt; &lt;label&gt; tag must always be placed next to various &lt;input&gt; field’s(text, password, email..) This allows highlighting the label when focus is made on the respective Input field.  |
| .hcl-form-group   | Both &lt;textarea&gt; & &lt;label&gt; must be wrapped in with class .hcl-form-group                                                                                                                                                                                                   |
