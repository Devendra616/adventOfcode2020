const fs = require('fs');

/* 
    https://adventofcode.com/2020/day/3
*/
const readFileAndReturnArrayofLine = (fileLocation) => {
    const fileContent = fs.readFileSync(fileLocation, 'utf-8');
    const stringArray = fileContent.trim().split('\n');
    const geologyArray = stringArray.map(line => {
      const trimmedLine = line.trim();
      if (trimmedLine !== '') {
          return [...trimmedLine];          
      }
    });
    return geologyArray;
  }

  function traverseGeology(geologyArray) {
    const depth = geologyArray.length;
    const width = geologyArray[0].length;
    let countTrees =0;
    let horizPath = 0;
    let verticalPath = 0;

    while(verticalPath < depth) {       
      const reachPoint = geologyArray[verticalPath][horizPath];
      countTrees = reachPoint == '#'?countTrees +1: countTrees; 

      horizPath = (horizPath+3)%width;
      verticalPath++;      
    }
  
    return countTrees;
  }

const inputArr = readFileAndReturnArrayofLine('./input.txt');
console.log(traverseGeology(inputArr));