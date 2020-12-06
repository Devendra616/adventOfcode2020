const fs = require('fs');

/* 
    https://adventofcode.com/2020/day/3
*/
const readFileAndReturnArrayofLine = (fileLocation) => {
    const fileContent = fs.readFileSync(fileLocation, 'utf-8');
    const stringArray = fileContent.trim().split(/(\r?\n|\r){3,}/g); 
    let passportArray =[];
    stringArray.forEach(passport => {
    let trimmedPassport = passport.trim(); 
    trimmedPassport = trimmedPassport.replace(/\r?\n|\r/g," ");
    const passportObj = {}; 
    if (trimmedPassport !== '' && trimmedPassport != '\n') { 
          const recordArray = trimmedPassport.trim().split(" ");          
          recordArray.forEach( record => {            
            const key = record.split(":")[0].trim();
            const value = record.split(":")[1].trim();
            passportObj[key] = value;
          });      
          passportArray.push(passportObj);                  
      }      
    }); 
    return passportArray;
  }

  function countValidPassports(passportArray) {
    let countValid = 0;  
    passportArray.forEach(passport => {
      countValid = isValidPassport(passport) ? countValid +1 : countValid;
    });
    return countValid;
  }

  function isValidPassport(passport) { 
   return (('byr' in passport) && ('iyr' in passport) && ('eyr' in passport) && 
            ('hgt' in passport) && ('hcl' in passport) && ('ecl' in passport) &&
            ('pid' in passport));
  }

const inputArr = readFileAndReturnArrayofLine('./input.txt'); 
const validPassportCounts = countValidPassports(inputArr);
console.log(validPassportCounts);