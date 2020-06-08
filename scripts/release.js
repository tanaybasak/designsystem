const path = require('path');
const replace = require('replace');
const q = require('q');
const root = require('app-root-path').path;
const git = require('simple-git')(root);
const packageFile = path.join(__dirname, '../', 'package.json');
const child_process = require('child_process');

const BRANCH_NAME = process.env.BRANCH || 'feature-uicoe-865';
let DESCRIPTION = `dev description`;

let PROCESS_DESC = '';
let PROCESS_VER = '';

// const dummy = () => {
//     let deferred = q.defer();
//     child_process.exec(`echo $TEST_FRIDAY`, (err, stdout, stderr) => {
//         if (!err) {
//             console.log(`--- Result ---`);
//             console.log(stdout.trim());
//             process.exit(0);
//             deferred.resolve();
//         } else {
//             console.log(`--- EXIT ---`);
//             process.exit(0);
//             deferred.reject();
//         }
//     });

//     return deferred.promise;
// }

const getVersion = () => {
  PROCESS_VER = process.env.version;
  PROCESS_DESC = process.env.desc;
  PROCESS_VER = PROCESS_VER.replace(/\n/gi, '');

  console.log(`Version To Update: ${PROCESS_VER}`);
  console.log(`BRANCH NAME IS: ${BRANCH_NAME}`);
  process.exit(0);
  return q.when(PROCESS_VER);
}


const bump = (version) => {
  replace({
    regex: /"version": "[^"]+"/m,
    replacement: `"version": "${version}"`,
    paths: [packageFile],
    recursive: false,
  });
  return q.when(version);
}

function addAndCommit(version) {
  if (!version) {
    console.log('No valid version!');
    return deferred.reject(new Error(`Problem in ${version}`));
  }

  var deferred = q.defer();
  git.pull('origin', `${BRANCH_NAME}`, (err1, result1) => {
    if (!err1) {
      console.log(`GIT:Adding...`);
      git.add('./*', (err2, result2) => {
        if (!err2) {
          console.log(`GIT:Committing...`);
          git.commit(`chore(release): ${version}`, [packageFile], (err3, result3) => {
            if (!err3) {
              console.log('Tagging...');
              if (PROCESS_DESC != "") {
                DESCRIPTION = PROCESS_DESC;
              }
              git.addAnnotatedTag(`v${version}`, `${DESCRIPTION}`, () => deferred.resolve(version));
            } else {
              return deferred.reject(new Error(`GIT:Commit: Issue`));
            }
          });
        } else {
          return deferred.reject(new Error(`GIT:Add: Issue`));
        }
      })
    } else {
      return deferred.reject(new Error(`GIT:Pull Issue`));
    }
  })
  return deferred.promise;
}

function pushToBranch(version) {
  let deferred = q.defer();

  console.log(`GIT:Push --> ${BRANCH_NAME}`);
  git.push(['origin', `HEAD:refs/heads/${BRANCH_NAME}`], (err, result) => {
    if (!err) {
      console.log(`GIT:Push:Tags`);
      git.pushTags(`origin`, () => {
        return deferred.resolve(version);
      });
    } else {
      return deferred.reject(new Error(`**** Issue in Pushing to ${BRANCH_NAME} / Issue in Pushing Tags ****`));
    }
  });
  return deferred.promise;
}

// getVersion()
// dummy()
getVersion()
  .then((version) => {
    return bump(version);
  })
  .then((version) => {
    return addAndCommit(version);
  })
  .then((version) => {
    return pushToBranch(version);
  })
  .done(() => {
    console.log("Tasks Completed");
  })