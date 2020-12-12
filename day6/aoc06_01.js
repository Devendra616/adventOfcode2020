const fs = require('fs');
const readline = require('readline');

/* 
    https://adventofcode.com/2020/day/6
*/
const readFileAndReturnArrayofGroups = async (fileLocation) => {
   let groupArr =[];
    try {
      const data = await fs.promises.readFile(fileLocation,'utf-8');
      let groupArr = data.toString().replace(/\r\n/g, "\n").split("\n\n");
      groupArr = groupArr.map(group =>   group.replace(/\n/g,''));
      return groupArr
    } catch(err) {
      throw err;
    }  
    
  }

 function countYes(groupAns) {
    const answerSet = new Set();
    [...groupAns].forEach( answer => answerSet.add(answer));
    return answerSet.size;
  }

  function readAnswers(groupArr) {
    let count =0
  
    for(let group of groupArr) {
      count += countYes(group)
    }
    return count;
  }

const mainFunction = async () => {
  await readFileAndReturnArrayofGroups('input.txt')
        .then(ans => readAnswers(ans))
        .then(console.log)
}

mainFunction();