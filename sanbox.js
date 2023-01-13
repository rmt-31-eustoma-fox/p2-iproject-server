const { TIME, DATE } = require("sequelize");

let x = new Date().toLocaleString().replace(/\s/g, '')
let y = "aku" + new TIME()

console.log(x);
console.log(typeof x);
console.log(y);
console.log(typeof y);