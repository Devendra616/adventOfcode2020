  const fs = require('fs');

/* Day1 
    https://adventofcode.com/2020/day/1
*/

const readFileAndReturnArrayOfNumbers = (fileLocation) => {
    const fileContent = fs.readFileSync(fileLocation, 'utf-8');
    const stringArray = fileContent.trim().split('\n');
    const parsedAsIntegersArray = stringArray.map(line => {
      const trimmedLine = line.trim();
      if (trimmedLine !== '') {
        return parseInt(trimmedLine);
      }
    });
    return parsedAsIntegersArray
  }


function multiply2(list) {
    let tempArray=[];
    
    for(let index=0; index<list.length;index++) {
        let element = list[index];
        let reqdElement = parseInt(2020 - element);
            
        if(tempArray.includes(element))   {
            return result = reqdElement * element;         
        } else {
            tempArray.push(reqdElement);
        }
        };
   return result;
 }


 /* https://adventofcode.com/2020/day/1#part2 */
function multiply3(list) {
 
    for(let first=0;first < list.length-2; first++) {
        for(let second = first+1; second < list.length-1; second++) {
            for(let third = second +1; third < list.length; third++) {
                if(list[third] === (2020- (list[first] +  list[second]))) {
                    return list[first] * list[second] * list[third];
                }
            }
        }
    }
   return result;
}

const inputArr = readFileAndReturnArrayOfNumbers('./input.txt');
console.log(multiply2(inputArr));
console.log(multiply3(inputArr));