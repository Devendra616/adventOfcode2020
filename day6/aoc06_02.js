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
      groupArr = groupArr.map(group =>   group.split(/\n/g));
      return groupArr
    } catch(err) {
      throw err;
    }  
    
  }

 function countYes(groupAns) {
   //console.log("groupAns",groupAns);
   let count =0;
   const uniqueAns = new Set();

   if(groupAns.length === 1) { //if only one person answers
    count =  groupAns[0].length
    } else {     
     let groupAnsArray =[];
    groupAns.forEach(person => {
      groupAnsArray.push([...person])
    });
    const intersectionData = groupAnsArray.reduce( (a,b) => a.filter(c=> b.includes(c)));
    //console.log(intersectionData, "**********", intersectionData.length);
    count = intersectionData.length;
   }
   
   return count;
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