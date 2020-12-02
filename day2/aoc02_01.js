const fs = require('fs');

/* 
    https://adventofcode.com/2020/day/2
*/
const readFileAndReturnArrayofLine = (fileLocation) => {
    const fileContent = fs.readFileSync(fileLocation, 'utf-8');
    const stringArray = fileContent.trim().split('\n');
    const parsedAsArray = stringArray.map(line => {
      const trimmedLine = line.trim();
      if (trimmedLine !== '') {
          const tempArray = trimmedLine.split(" ");
          const range = tempArray[0];
          const minCount = parseInt(range.split("-")[0]);
          const maxCount = parseInt(range.split("-")[1]);
          const pwdLetter =  tempArray[1].split(":")[0];
          const pwd = tempArray[2];
        return new Array(minCount,maxCount,pwdLetter,pwd);
      }
    });
    return parsedAsArray;
  }

function isValidPassword(inputPassword) {
    const minCount = inputPassword[0];
    const maxCount = inputPassword[1];
    const pwdLetter = inputPassword[2];
    const pwdString = inputPassword[3];

    const countPwdLetter = [...pwdString].filter( letter => letter === pwdLetter).length;
    const isValid = (countPwdLetter >=minCount && countPwdLetter <= maxCount) ;
    return isValid;
}

function countValidpasswords(inputArray) {
    let countValid =0 ;
    inputArray.forEach(arr => {
        countValid = isValidPassword(arr)? countValid +1: countValid;
    });
    return countValid;
}

const inputArr = readFileAndReturnArrayofLine('./input.txt');
console.log(countValidpasswords(inputArr));