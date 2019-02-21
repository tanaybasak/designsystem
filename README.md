# Patron

Patron is a CSS framework. It follows the HCL guideliens and priniciples. If you are working on HCL products, we recommend you to follow Patron.

  - Responsive - flexbox based
  - CSS3
  - SCSS
  - HCL themes
  - Supported in all modern browsers

# styleguide

  http://10.115.87.64:8080/

# Tech
  - SCSS
  - Parceljs 

# What is in V1.0!

  ### Typography 
  -   Roboto font-family 
  -   rem based
  -   HCL theme based
  -   Headings, body text, list, anchore link
  
  ### Grids
  -  12 col based
  -   row/col approach
  
  ### Buttons
  -  2 types of buttons
  
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
- Mixins should be in one file : mixin.scss






   