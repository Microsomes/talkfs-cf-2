

const toSort = require("./toSort.json")

console.log(toSort.length)

toSort.forEach((item)=>{
   var lindex = parseInt(item.text.split('Lesson')[1].split(" ")[1])
   item.lindex = lindex;
})

toSort.sort((a,b)=>{
    return a.lindex - b.lindex;
})

console.log(toSort)


const fs = require('fs');

fs.writeFileSync('sorted.json', JSON.stringify(toSort, null, 2), 'utf-8');
// //         console.log(doc.data())