
## Modal

Modals communicate information via a secondary window and allow the user to maintain the context of a particular task.

### Success modal

Example of success

### Success modal with label

Example of success-label

### Success modal with action

Example of success-action

### Success modal with label and action

Example of success-label-action

### Danger modal

Example of danger

### Danger modal with label

Example of danger-label

### Danger modal with action

Example of danger-action

### Danger modal with label and action

Example of danger-label-action



### General Guidelines

- Modals interrupt user workflow by design. They are most effective when a task must be completed before a user can continue. While effective when used correctly, Modals should be used sparingly to limit disruption to a user experience.

- **Dismissal:** Modals may be dismissed in three ways:

  - Using the “✕” in the upper right-hand corner of a Modal
  - Pressing the ESC key
  - Clicking or touching outside of a Modal

- A Modal is composed of three distinct zones: A header, the body, and a footer. Components (e.g., data table, form, progress indicator) can occupy the full width of the modal.

- **Modal Header:** The header of your Modal should mirror the action that launched it. Headers must include a close button “✕” in the upper right-hand corner of the Modal.

- **Modal Label:** You can also include an optional label above your header text. This is an opportunity to offer additional context.

- **Modal Body:** A Modal should have minimal body content. Components that may be used in Modals include: form fields, text area, select, and radio buttons. Text, including the paragraph component, should only be 75% of the modal’s width.

- **Modal Footer:** The footer area of a Modal typically contains either one or two buttons. Do not include three buttons in the footer of a Modal. If you need to include a “help” or other non-primary action, include it as a link in the Modal’s body.



### Spec file

- Modal titles and labels should be set in sentence case. Keep all titles and labels concise and to the point. Modal labels are optional.  
  Spec file should be here.



### Documentaion

##### HTML

For success modal

Snippet of success html

For success modal with label

Snippet of success-label html

For success modal with action

Snippet of success-action html

For success modal with label and action

Snippet of success-label-action html

For danger modal

Snippet of danger html

For danger modal with label

Snippet of danger-label html

For danger modal with action

Snippet of danger-action html

For danger modal with label and action

Snippet of danger-label-action html

#### Classes

| Name                        | Description                                                     |
| --------------------------- | --------------------------------------------------------------- |
| .hcl-modal                  | This class is required to show modal along with overlay.        |
| .hcl-modal-hide             | This class is required to hide the modal along with overlay.    |
| .hcl-modal-container-danger | This class is required to style modal with danger colour (red). |
