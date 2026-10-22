// import fs from "fs";
// import path from "path";
const fs = require('fs');
const path = require('path');

const message = "This is my first file creating with Node.js fs module!";
const filePath = path.join(__dirname, "message.txt");
fs.writeFileSync(filePath, message, "utf8");
console.log(`File written successfully at ${filePath}`);

// // write-file.js
// const message = "This is my first file created with Node.js!";
// const filePath = path.join(__dirname, 'my-message.txt');
// fs.writeFileSync(filePath, message);
// console.log("File created successfully!");
