/* Day1 
    https://adventofcode.com/2020/day/1
*/

function check2020(list) {
    const len = list.length;

   for(let left=0;left <len; left++) {
       for(let right=len-1; right>0; right--) {
           if(list[left] === 2020 - list[right]) {
               return list[left] * list[right];
           }
       }
   }
}