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

    //Stop if length reached
    if(index === data.length-1) { 
      break;
    }

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
    }
  }
  
  return {acc: sum,isLoop: isLoop};
 }

 const mainFunction = async () => {
  await readFileData('input.txt')
        .then(data => checkLoop(data))
        .then(data => data['acc'])
        .then(console.log);
}

mainFunction();