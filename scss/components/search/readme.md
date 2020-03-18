
## Search

Search enables users to specify a word or a phrase to find relevant pieces of content without the use of navigation. Search can be used as the primary means of discovering content, or as a filter to aid the user in finding content.

### Normal

Example of normal

### Expandable

Example of expandable



### General Guidelines

**Expandable fields**

- Is indicated by a search icon.

- Expands to the left when the user clicks on the icon.

- Stays open until the user clears the search.

- Both large and small search variations can be made expandable.

**Search fields**

- Set the user’s context for the search with helpful placeholder text within the search field (search documents), that pertains to the page or section the search box is in. Search in the global header should just say search.

- If the search component’s label and placeholder text differ, VoiceOver on macOS will read both.

**Search results**

- Clearly show which results are being displayed with labels or headers (i.e. Results for X).

- Categorize the search results if they come from different areas (eg. docs, services, apps, tutorials, blogs).

- Give the user control over their viewing options and ability to sort results (eg. relevancy, popularity, ratings, date).

- Have a clear, “no results,” message and offer suggestions if possible.

- Have smart algorithms that can search for similar terms or can search even with misspelled words.

- Include enough of a description in the results for users to make a judgement as to whether that particular result is relevant.

- Highlight the search term in the results, where appropriate.



### Spec file

Search text should be set in sentence case, with only the first letter of the first word capitalized.

Spec file should be here.



### Documentaion

##### Triggers

For Search

Snippet of normal trigger

##### HTML

For normal

Snippet of normal html

For expandable

Snippet of expandable html

#### Classes

| Name                 | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| .hcl-search-sm       | Selector for applying small search styles                       |
| .hcl-bg-white        | Selector for applying white background in the search text field |
| .hcl-search-btn-only | Selector for applying clickable/header search                   |
