const now = new Date();
const j = now.getDate();
const m = now.getMonth()+1;
const a = now.getFullYear();
const date = j + ':'+ m  + ':'+ a ;

module.exports = date;