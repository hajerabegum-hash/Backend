const args = process.argv.slice(2); // Skip first two
const name = args[0] || "Guest";
const age = args[1];
console.log(`Hello, ${name}!`);
if (age) {
  console.log(`You are ${age} years old.`);
  const yearBorn = new Date().getFullYear() - Number(age);
  console.log(`You were born in ${yearBorn}.`);
}
