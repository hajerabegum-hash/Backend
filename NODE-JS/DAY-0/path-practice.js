// const path = require("path");
// // Practice 1: Build different file paths
// const htmlPath = path.join(__dirname, "public", "index.html");
// const cssPath = path.join(__dirname, "public", "styles", "main.css");
// const jsPath = path.join(__dirname, "src", "app.js");
// console.log("HTML:", htmlPath);
// console.log("CSS:", cssPath);
// console.log("JS:", jsPath);
// // Practice 2: Extract information from paths
// const filePath = "/users/john/documents/report.pdf";
// console.log("Extension:", path.extname(filePath));
// console.log("Filename:", path.basename(filePath));
// console.log("Directory:", path.dirname(filePath));
// console.log("Name without ext:", path.basename(filePath, ".pdf"));
// // Practice 3: Parse paths
// const parsed = path.parse(filePath);
// console.log("Parsed:", parsed);
// // Practice 4: Create path from parts
// const reconstructed = path.format({
//   dir: "/users/john/documents",
//   base: "report.pdf",
// });
// console.log("Reconstructed:", reconstructed);

//The fs Module (File System)
// The fs module allows you to work with the file system - reading, writing, and managing files.

import fs from "fs";
// Read a file (synchronous)
const content = fs.readFileSync("message.txt", "utf8");
console.log(content);
// Write to a file (synchronous)
fs.writeFileSync("output.txt", "Hello, Node.js!");
// Append to a file
fs.appendFileSync("log.txt", "New log entry\n");
// Check if file exists
if (fs.existsSync("data.json")) {
  console.log("File exists!");
}
// Read directory contents
const files = fs.readdirSync("./");
console.log("Files:", files);
