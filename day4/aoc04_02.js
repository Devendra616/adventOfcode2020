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

  function validateByr(passport) {
    const year = passport['byr'];
    const yr = parseInt(year);
    const pattern = new RegExp(/^\d{4}$/g); 
    return pattern.test(yr) &&  yr >=1920 && yr <=2002;
  }

  function validateIyr(passport) {
    const year = passport['iyr'];
    const yr = parseInt(year);
    const pattern = new RegExp(/^\d{4}$/g); 
    return pattern.test(yr) &&  yr >=2010 && yr <=2020;
  }

  function validateEyr(passport) {
    const year = passport['eyr'];
    const yr = parseInt(year);
    const pattern = new RegExp(/^\d{4}$/g);
    return pattern.test(yr) &&  yr >=2020 && yr <=2030;
  }

  
  function validateHgt(passport) {    
    const value = passport['hgt'];
    const pattern = new RegExp(/^\d+(in|cm)$/g); 
    if(pattern.test(value)) {
      const unit = value.slice(-2); 
      const height = value.substring(0,value.length-2);
      if(unit === "cm") {
        return height >=150 && height <=193; 
      } else if(unit === "in") { 
        return height >=59 && height <=76;
      }
      return false;
    }
  }

  function validateHcl(passport) {
    const color = passport['hcl'];
    const pattern = new RegExp(/^#(\d|[a-f]){6}$/i);
    return pattern.test(color);
  }

  function validateEcl(passport) { 
    const color = passport['ecl'];
    return color === "amb" || color === "blu" || color === "brn"|| 
           color === "gry"|| color === "grn"|| color === "hzl" || color === "oth";
  }

  function validatePid(passport) {
    const id = passport['pid'];
    const pattern = new RegExp(/^\d{9}$/);
    return pattern.test(id);
  }

  function isValidPassport(passport) { 
   const areFieldsPresent =  (('byr' in passport) && ('iyr' in passport) && ('eyr' in passport) && 
            ('hgt' in passport) && ('hcl' in passport) && ('ecl' in passport) &&
            ('pid' in passport));
    if(areFieldsPresent) {
      return validateByr(passport) && validateIyr(passport) && validateEyr(passport) &&
                              validateHgt(passport) && validateHcl(passport) && validateEcl(passport) &&
                              validatePid(passport);
    }
    return false;
  }

const inputArr = readFileAndReturnArrayofLine('./input.txt'); 
const validPassportCounts = countValidPassports(inputArr);
console.log(validPassportCounts);