const sum=(a,b)=> a+b

let [,,a,b]=process.argv

console.log(sum(parseInt(a),parseInt(b)))