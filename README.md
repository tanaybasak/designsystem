# Patron-CSS 

Patron is a CSS framework. It follows the HCL guidelines and priniciples. If you are working on HCL products, we recommend you to follow Patron.

  - Responsive - flexbox based
  - CSS3
  - SCSS
  - HCL themes
  - Supported in all modern browsers
  - rem unit
  - line-height : headings: 1.15 and body 1.125
  - TypeSize from 12px
  - Base TypeSize is 16px

# Development process 

We are following feature-based development. Developer will get JIRA story assigned. Developer can 
create the tasks for the stories. The branch name should be the JIRA ID. Eg:

```sh
feature/UICoE-[ID]
```

# PR Process
No code should be merged without the peer review. It is mandatory to raise the PR for every code
developer or anyone is committing with proper description. 
* Don't push long code in PR.
* Do write descriptive PR comments.
* Do add atleast 3 developers for review.
* Do not close the PR unless the reviews are resolved.
* Do write 'WIP' for the PR if you want to have pre review.

# Defect fixing process
We are following defect-ID-based defect fixing development. Developer will get JIRA issue assigned. The branch name should be the JIRA ID. Eg:

```sh
defect/UICoE-[ID]
```

# styleguide

  http://10.115.87.64:8080/
  Carbon Design System

# Tech
  - SCSS
  - Parceljs 

# What is in V1.0!

  ## Typography 
  | PROPS | VALUE |
  | ------ | ------ |
  | font-family | Roboto |
  | Typesize unit | rem  |
  | Base font-size | 16px = 1rem |
  | Line-height | XX |
  | Headings | h1-h6 and classes .h1-.h6 |
  | font-weight | 300, 400, 800 |
  | font-style | italic, underline |
  | text-transform | uppercase, lowercase, capitalize |
  | text-align | left, right, center, justify |
  
  ## Grids
  | PROPS | VALUE |
  | ------ | ------ |
  | columns | 12 |
  | row/col | both |
  | CSS | Flexbox |
  | default padding | XX |
  | default margin | XX | 
   
  ## Buttons
  | PROPS | VALUE |
  | ------ | ------ |
  | buttons style | XX |

  ## Forms 
  | PROPS | VALUE |
  | ------ | ------ |
  | Forms | XX | 
  
 # How to use? 
  1) Install parceljs 
  npm install -g parcel-bundler

  2) Install rest of the dependecies by running the following command at the root of the folder
  npm install 

  3) Run Localhost by
  parcel index.html or npm run dev

  4) Build
  npm run build 

# Guidelines for writting SCSS

- Prefer CSS variables over sass variables. 
- Create SASS variables only where you need to use them in the SCSS specific syntax. Such as : interpolation
- Take the decision – is the property can be reuse more than once? If yes, create the variable
- Your reference point could be twitter bootstrap and other libs but do not copy the same code from the 3rd lib.
- Write the generic class, elements and css
- Do not control the text-transform from css
- The nesting should not exceed more than 4 levels
- Keep checking the generated CSS to see if the written SCSS code is bloating or not
- Follow the modular based development approach : create the SCSS file for the modules rather than writing whole code in 1 file. 
Such as : button(s) style should be the part of button.scss , typography in one file, if listing as different style 
then we can move the list styling from Typography.scss and create new file list.scss. 
- Mixins should be in one file : mixin.scss.
- One should follow the camelNameCase.
- If you are using map mention'-map' after the name of the map.

# License

HCL Technologies 2019-2020
