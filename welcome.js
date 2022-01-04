console.log('Hello,World');

const double=(a,b)=>a*b;

let [,,a,b]=process.argv;

console.log(double(a,b));
console.log(process.argv)