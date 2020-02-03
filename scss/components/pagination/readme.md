<div id="Overview"></div>

## Pagination

Pagination is used for splitting up content or data into several pages, with a control for navigating to the next or previous page. Generally, Pagination is used if there are more than 25 items displayed in one view. The default number displayed will vary depending on the context.

Example of pagination

<div id="General-Guideline"></div>

### General Guidelines

**Identify the current page:** Clearly identify which page the user is on by displaying the current page number. By providing context into how many pages there are in total (e.g., 1 of 4 pages), you can help provide clarity around the data displayed. 

**Provide various options for navigating:** Previous and next chevrons or links are the most useful way for the user to move forward or backward through pages of data.

**Page navigation:** Provide an inline select in which users can choose the page they wish to navigate to.

**Items per page:** Use an inline select within the pagination bar so the user can change the amount of data displayed per page. 

<div id="Spec-file"></div>

### Spec file

- Pagination text should be set in set in sentence case with the first letter of each word capitalized. 
- The Pagination bar is most commonly used in Data Tables. The width can vary depending on content and layout, but should span the entire width of the table it’s being paired with.

Spec file should be here.

<div id="Documentation"></div>

### Documentaion

##### HTML

Snippet of pagination html

#### Classes

| Name                               | Description                                                                                   |
|------------------------------------|-----------------------------------------------------------------------------------------------|
| .hcl-pagination                    | Wrapper class for the Component                                                               |
| .hcl-pagination-left               | Left side Panel of the Pagination Component containing _Items per Page_ & _Total items_ data. |
| .hcl-pagination-right              | Right side Panel of the Pagination Component containing _No of Pages_ & _Current Page_ data.  |
| .hcl-pagination-text               | For Holding text items of the Component.                                                      |
| .hcl-pagination-range              | Pagination Range holder of the Component.                                                     |
| .hcl-range-start                   | Holder for Start Range of the Component.                                                      |
| .hcl-range-end                     | Holder for End Range of the Component.                                                        |
| .hcl-pagination-button-previous    | Previous Button Class.                                                                        |
| .hcl-pagination-button-next        | Next Button Class.                                                                            |

#### Public Methods

Pagination component can be subscribed to custom events as follow.

| Name          | Params | Description                                                                                                  |
|---------------|--------|--------------------------------------------------------------------------------------------------------------|
| pageChange    |        | Event which can be subscribed to the root component when there is change in Next/Previous Button is pressed. |
| pageNumber    |        | Event which can be subscribed to the root component when there is change in Page Number Dropdown.            |
| itemsPerPage  |        | Event which can be subscribed to the root component when there is change in Items per Page Dropdown.         |