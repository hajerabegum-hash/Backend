// console.log("All Arguments:", process.argv[0], process.argv[1], process.argv.slice(2));
// console.log("All arguments:", process.argv)[0];
// process.argv structure:
// [0] - Path to Node executable
// [1] - Path to the JavaScript file
// [2+] - Your custom arguments


const args = process.argv.slice(2); // Skip first two
console.log("Your arguments:", args);