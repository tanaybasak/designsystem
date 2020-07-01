##### Formattting

All forms are comprised of six elements:

- **Labels:** Inform users what the corresponding input fields mean.

- **Input fields:** Enable users to provide information. Information can be entered through a variety of different input fields ranging from text fields, checkboxes, and many other types.

- **Help text:** Provides guidance on how to fill out a field. Help text is optional.

- **Placeholder text:** Hints at what goes into a field. Placeholder text is optional.

- **Validation:** Ensures the data submitted by the user conforms to acceptable parameters.

- **Actions:** Allow users to submit a form.

##### Action Buttons

- The action buttons are placed usually at the bottom of the inputs, they are usually to the right if the form is in a container (modal/dialog/card etc.) or else if inline they might be at the left.

- When there is a secondary action button, the ordering of the buttons are:

  - Secondary to the left, Primary to the right.
  - Negative to the left, Positive to the right.  
    (If the primary action is negative, e.g. Delete, then it should go to the right, but must use the danger button)

- Generally avoid Cancel/OK button pairs, use actual action verbs instead of OK, (Agree, Delete, Send, Submit, etc.)

##### Required and optional fields

- If all fields are required, indicated that on red help text on top. Asterisks are not mandatory in that case.

- If you’re using an asterisk for a required field label, the asterisk comes first and is red in color e.g. \*First Name

- If only a few fields are optional, labeling them (optional) in the help text may be useful.
