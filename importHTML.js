const fs = require('fs');

const file = 'main.html';
const target = 'index.html';
let fileContent = fs.readFileSync(file, 'utf8');

const lookForOpeningTag = index => {
  let start;
  for (
    let i = index;
    i >= 0 && (fileContent[i] !== '<' || fileContent[i] === ' ');
    i--
  ) {
    start = i - 1;
  }
  return start;
};

const lookForClosingTag = index => {
  let end;
  for (let i = index; i < fileContent.length && fileContent[i] !== '>'; i++) {
    end = i + 1;
  }
  return end;
};

const lookForTag = index => {
  const start = lookForOpeningTag(index);
  const end = lookForClosingTag(index);
  return fileContent.substr(start, end - start + 1);
};

const getSrcContent = str => {
  const strArray = str.trim().split(' ');
  let src = strArray[1].trim();
  src = src.substr(5, src.length - 6);
  //   console.log('src', src);
  if (fs.existsSync(`${src}`)) {
    src = fs.readFileSync(`${src}`, 'utf8');
  }
  return src;
};

while (fileContent.includes('addHTML')) {
  const index = fileContent.indexOf('addHTML');
  const substr = lookForTag(index);
  const srcContent = getSrcContent(substr);
  //   console.log('srcContent ===>', srcContent);
  fileContent = fileContent.replace(substr, srcContent);
  //   console.log('substr', substr);
}

if (fs.existsSync(`./${target}`)) {
  fs.unlinkSync(`./${target}`);
}

fs.appendFileSync(`./${target}`, fileContent, () => {});
// console.log('content', fileContent);
