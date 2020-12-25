const fs = require("fs");
const { prependListener } = require("process");

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
      return num;
    }
  }
 }

 const mainFunction = async () => {
  await readFileData('input.txt')       
        .then(data => findNumber(data,25))
        .then(console.log);
}

mainFunction();