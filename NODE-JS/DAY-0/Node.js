const path = require("path");
// Get current directory
console.log("Current directory:", __dirname);
//join paths safely
const filePath = path.join(__dirname, "data", "file.txt");
console.log("File path:", filePath);
// Get file extension
const ext = path.extname(filePath);
console.log("File extension:", ext);
// Get file name without extension
const fileName = path.basename(filePath, ext);
console.log("File name without extension:", fileName);
console.log(path.extname("document.pdf")); // .pdf
//Get directory name
console.log(path.dirname(filePath)); // C:\Users\Administrator\Desktop\Backend\NODE-JS\DAY-0\data
//Parse a path
const parsedPath = path.parse(filePath);
console.log("Parsed path:", parsedPath);
//parse a path with a custom root
const customRootPath = path.parse(filePath, { root: "C:\\" });
console.log("Parsed path with custom root:", customRootPath);   