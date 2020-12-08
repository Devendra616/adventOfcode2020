const fs = require('fs');

/* 
    https://adventofcode.com/2020/day/3
*/
const readFileAndReturnArrayofLine = (fileLocation) => {
    const fileContent = fs.readFileSync(fileLocation, 'utf-8');
    const boardingPassArray=[];
    const stringArray = fileContent.trim().split(/(\r?\n|\r)/g); 

    stringArray.forEach(boardingPass => {  
      boardingPass = boardingPass.trim();
      const passObj = {}; 
      if (boardingPass !== '') { 
          const row = boardingPass.substring(0,7);  
          const column =boardingPass.substring(7);
          passObj['row'] = row;
          passObj['column'] = column;
          boardingPassArray.push(passObj);                 
      }      
    }); 
    
    return boardingPassArray;
  }

 function traverse(inputArr,index=0,low=0,high = Math.pow(2,inputArr.length) -1) {
    let mid = Math.floor((high - low+1)/2);
    const char = inputArr[index];

    if(low === high || index === inputArr.length) {
      return low;
    }

    if(char === 'F' || char === 'L') { //take lower half
      high = low + mid -1;
    } else if(char === 'B' || char === 'R') { //take upper half
      low = low + mid;
    }
    index++;  
    return traverse(inputArr,index,low,high);
  }

  function findSeatId(boardingPass) {
    const rowData =  boardingPass.row;
    const columnData = boardingPass.column;
    const rowId = traverse([...rowData]);
    const columnId = traverse([...columnData]);
    const seatId = rowId*8 + columnId;
    return seatId;
  }

  function highestSeatId(boardingPassArray) {
  //console.log(boardingPassArray)
    let highestId = 0;
    boardingPassArray.forEach( boardingPass => {
      const seatId = findSeatId(boardingPass);
      highestId = seatId > highestId ? seatId:highestId;
    });
    return highestId;
  }
  
const inputArr = readFileAndReturnArrayofLine('./input.txt'); 

console.log(highestSeatId(inputArr))