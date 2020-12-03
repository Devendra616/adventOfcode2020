const fs = require('fs');

/* 
    https://adventofcode.com/2020/day/3#part2
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

  function traverseGeology(geologyArray, right,down) {
    const depth = geologyArray.length;
    const width = geologyArray[0].length;
    let countTrees =0;
    let horizPath = 0;
    let verticalPath = 0;

    while(verticalPath < depth) {       
      const reachPoint = geologyArray[verticalPath][horizPath];
      countTrees = reachPoint == '#'?countTrees +1: countTrees; 

      horizPath = (horizPath+right)%width;
      verticalPath += down;      
    }
  
    return countTrees;
  }

  function productCountTrees(geologyArray) {
    const p1 = traverseGeology(geologyArray,1,1);
    const p2 = traverseGeology(geologyArray,3,1);
    const p3 = traverseGeology(geologyArray,5,1);
    const p4 = traverseGeology(geologyArray,7,1);
    const p5 = traverseGeology(geologyArray,1,2);
    return p1*p2*p3*p4*p5;
  }

const inputArr = readFileAndReturnArrayofLine('./input.txt');
console.log(productCountTrees(inputArr));