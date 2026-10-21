const args = process.argv.slice(2); // Skip first two
const num1 = Number(args[0]);
const operator = args[1];
const num2 = Number(args[2]);


// console.log(`${num1} ${operator} ${num2} = `);
let result;
if (operator === '+') {
result = num1 + num2;
} else if (operator === '-') {
result = num1 - num2;
} else if (operator === '*') {
result = num1 * num2;
} else if (operator === '/') {
result = num1 / num2;
} else {
console.log("Invalid operator!");
}
console.log(`${num1} ${operator} ${num2} = ${result}`);

