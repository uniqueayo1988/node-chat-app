var moment = require('moment');

// var date =new Date();
// console.log(date.getMonth())

var date = moment()
date.add(2, 'year')
console.log(date.format('MMM Do, YYYY'))

console.log(date.format("h:mm a"))
