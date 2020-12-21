const fs = require("fs");

const readFileData = async (fileLocation) => {
  try {
    const data = await fs.promises.readFile(fileLocation,'utf-8');
    let linesArr = data.toString().replace(/\r\n/g, "\n").split("\n");    
    linesArr = linesArr.map(line =>   {
      line = line.trim();
      return {
        'operation': line.split(" ")[0],
      'arg': line.split(" ")[1],
      'visited':false
      }
    });
    //console.log("🚀 ~ file: aoc08_01.js ~ line 15 ~ readFileData ~ linesArr", linesArr);
    return linesArr
  } catch(err) {
    throw err;
  }   
 }

 const checkLoop = async (data)=> {
  let sum=0;
  let isLoop = false;
  let index=0;
  while(!isLoop) {    
    let {operation, arg,visited} = data[index];

    if(visited) {
      isLoop= true;
    } else {
        data[index]['visited'] =true;
      if(operation === 'nop') {
        index++;        
      } else if(operation === 'acc') {
        sum += Number(arg);
        index++;
      } else { //operation = jmp
        index += Number(arg);
      }

         //Stop if length reached
     if(index >= data.length) { 
      break;
     }
    }
  }
  
  return {acc: sum,isLoop: isLoop};
 }

const traverseInstructions = async (data) => {

  let result;
  for(let i=0;i<data.length;i++) {
    /* 
      dont change original data so clone data.
      tempData = [...data] clones at 1 level only, deper object are still references
    */
    let  tempData = JSON.parse(JSON.stringify(data)); 
    let {operation} = tempData[i];

    if(operation === 'jmp') {
      tempData[i].operation = 'nop';      
    } else if(operation === 'nop') {
      tempData[i].operation = 'jmp';
    } else {
      continue;
    }

    const {acc,isLoop} = await checkLoop(tempData);
  
    if(!isLoop) {
      result = acc;
      break;
    }    

  }

  return result;
}

const mainFunction = async () => {
  await readFileData('input.txt')
        .then(data => traverseInstructions(data))
        //.then(data => data['isLoop'])
        .then(console.log);
}

mainFunction();