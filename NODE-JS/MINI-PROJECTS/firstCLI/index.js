import fs from "fs";

const command = process.argv[2];
const filePath = process.argv[3];
console.log(filePath);

const data = fs.readFileSync(filePath, "utf8");

if (command === "words") {
  wordCounter();
} else if (command === "letters") {
  letterCounter();
}

function wordCounter() {
  const wordCount = data.split(" ").length - 1;
  console.log("The number of words in this file:", wordCount);
}

function letterCounter() {
  const count = data.length;
  console.log("The number of letters in this file:", count);}




  // C:/Users/Administrator/Desktop/Backend/NODE-JS/MINI-PROJECTS/firstCLI/Data/notes.txt