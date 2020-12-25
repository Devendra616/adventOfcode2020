const fs = require("fs");
const { prependListener } = require("process");
const { isNullOrUndefined } = require("util");

const readFileData = async (fileLocation) => {
  try {
    const data = await fs.promises.readFile(fileLocation,'utf-8');
    let linesArr = data.toString().replace(/\r\n/g, "\n").split("\n");    
    linesArr = linesArr.map(line =>   {
      line = line.trim();
      return Number(line);
    });
    
    return linesArr
  } catch(err) {
    throw err;
  }   
 }

 const findNumber = async(input, preambleLength) => {
   
   for (let index=preambleLength; index< input.length; index++) {
    
    let foundIndex=-1;
    let isValid = false;
    // Create preamble array
    const preamble =input.slice(index - preambleLength,index);
    const num = Number(input[index]);
    for(let i = 0;i<preambleLength; i++) {
       for(let j=i+1; j< preambleLength; j++) {
        const num1 =  Number(preamble[i]);
        const num2 = Number(preamble[j]);        
       
        if(num === num1+num2) {
          isValid = true;
          break;
        }
      }
      if(isValid) {
        break; //check other number
      }
    }
    if(!isValid) {    
      foundIndex = index;  
      return {num,foundIndex};
    }
  }
 }

 const encrpytionWeakness= async (invalid, input)=>{
  const {num, foundIndex}  = invalid;
  console.log("🚀 ~ file: aoc09_02.js ~ line 52 ~ encrpytionWeakness ~ invalid", invalid);

  for(let i=2; i<foundIndex;i++) { //no of terms to be taken
    let found = false;
    for(let j=0;j<foundIndex;j++) {
      let smallest = Number.MAX_SAFE_INTEGER;
      let largest = Number.MIN_SAFE_INTEGER;
      let sum=0;
      for(let k=0;k<i;k++) {
        sum += input[j+k];
        smallest = input[j+k] <smallest? input[j+k]:smallest;
        largest = input[j+k] >  largest? input[j+k]:largest;
      }
      
      if(sum === num){
        found = true;
        //console.log(largest, smallest, sum)
        return smallest+largest;
      }
    }
    
  }
 }

 const mainFunction = async () => {
  const input = await readFileData('input.txt')       
  const invalidNum =await findNumber(input,25);
  const result = await encrpytionWeakness(invalidNum,input)
                .then(console.log);
}

mainFunction();