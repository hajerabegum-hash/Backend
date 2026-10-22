// CHALK PRACTICE

// import chalk from "chalk";
// import { modifierNames, foregroundColorNames } from "chalk";

// console.log(modifierNames.includes("bold"));
// //=> true

// console.log(foregroundColorNames.includes("pink"));
// //=> false

// console.log(chalk.inverse.blue("Hello world!"));
// console.log(chalk.bgMagentaBright.blue("Bye world!"));

// const error = chalk.bold.underline.red;
// const warning = chalk.underlineCurly.yellow; // Yellow color

// console.log(error("Error!"));
// console.log(warning("Warning!"));
// const name = "Sindre";
// console.log(chalk.strikethrough.green("Hello %s"), name);
// const customChalk = new chalk.constructor({ level: 3 });

//// FIGLET PRACTICE

// import figlet from "figlet";

// async function doStuff() {
//   const text = await figlet.text("Hello World!!");
//   console.log(text);
// }

// doStuff();

// figlet.text(
//   "Boo!",
//   {
//     font: "Ghost",
//     horizontalLayout: "default",
//     verticalLayout: "default",
//     width: 80,
//     whitespaceBreak: true,
//   },
//   function (err, data) {
//     if (err) {
//       console.log("Something went wrong...");
//       console.dir(err);
//       return;
//     }
//     console.log(data);
//   }
// );

// figlet.metadata("Standard", function (err, options, headerComment) {
//   if (err) {
//     console.log("something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.dir(options);
//   console.log(headerComment);
// });

// try {
//   const [options, headerComment] = await figlet.metadata("Standard");
//   console.dir(options);
//   console.log(headerComment);
// } catch (err) {
//   console.log("something went wrong...");
//   console.dir(err);
// }
// figlet.defaults({ fontPath: "assets/fonts" });

// figlet.preloadFonts(["Standard", "Ghost"], ready);

// function ready() {
//   console.log(figlet.textSync("ASCII"));
//   console.log(figlet.textSync("Art", "Ghost"));
// }

//INQUIRER PRACTICE

// import inquirer from "inquirer";

// inquirer
//   .prompt(["What is your name?"
//     /* Pass your questions in here */
//   ])
//   .then((answers) => {console.log("running");
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       console.log("Prompt couldn't be rendered in the current environment");
//     }
//     // Prompt couldn't be rendered in the current environment
//     else {
//       console.log("Something else went wrong");
//       // Something else went wrong
//     }
//   });

// const prompt = inquirer.createPromptModule();

// prompt(questions).then(/* ... */);

// {
//   /* Preferred way: with promise */
//   filter() {
//     return new Promise(/* etc... */);
//   },

//   /* Legacy way: with this.async */
//   validate: function (input) {
//     // Declare function as asynchronous, and save the done callback
//     const done = this.async();

//     // Do async stuff
//     setTimeout(function() {
//       if (typeof input !== 'number') {
//         // Pass the return value in the done callback
//         done('You need to provide a number');
//       } else {
//         // Pass the return value in the done callback
//         done(null, true);
//       }
//     }, 3000);
//   }
// }

////IS-EVEN PRACTICE

// import isEven from "is-even";

// isEven(0);
// //=> true
// isEven('1');
// //=> false
// isEven(2);
// //=> true
// isEven('3');
// //=> false

//safely navigating directories with path module

import path from "path";
console.log(import.meta.dirname);

//output: C:\Users\Administrator\Desktop\Backend\NODE-JS\Day-1

const fullpath = path.join(import.meta.dirname, "test", "hello.txt");
console.log(fullpath);
