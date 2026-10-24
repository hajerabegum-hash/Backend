import express from "express";

const app = express();
// json parser (parsing the json from request body (client))
app.use(express.json());
// in-memory
const todoArray = [
  "Go to market",
  "Go to school",
  "Go to college",
  "Go to gym",
  "Go to park",
  "Go to home",
];

// ----------- /todo route -------------

// 1. GET handler (CRUD: Read)
app.get("/todo", (req, res) => {
  console.log("todo get request sent ");
  res.json({ getTodos: todoArray });
  //   res.send(`I got todoArray: ${JSON.stringify(todoArray)}`);
  //   res.send("todo get response received ");
});

// 2. POST handler (CRUD: Create)

app.post("/todo", (req, res) => {
  console.log("todo post request sent ");
  let newTodo = req.body.todoArray;
  todoArray.push(newTodo);
  res.json({ msg: "todo added successfully" });

  // res.json({msg:"todo added successfully",getTodos: todoArray});
  // res.json({ getTodos: todoArray });
  //   res.send("todo post response received ");
});

// 3. PUT handler (CRUD: Update)

app.put("/todo", (req, res) => {
  // let old_todo = req.body.old_todo;
  // let new_todo = req.body.new_todo;
  const { old_todoArray, new_todoArray } = req.body;
  const targetIndexElement = todoArray.indexOf(old_todoArray);
  todoArray.splice(targetIndexElement, 1, new_todoArray);
  console.log("todo put request sent ");
  res.json({ msg: "todo updates " + old_todoArray + " to " + new_todoArray });
  //   res.send("todo put response received ");
});

// app.put("/todo", (req, res) => {
//   // let old_todo = req.body.old_todo;
//   // let new_todo = req.body.new_todo;

//   const { old_todo, new_todo } = req.body;

//   const targetElementIndex = todoArr.indexOf(old_todo);

//   todoArray.splice(targetElementIndex, 1, new_todo);

//   res.json({
//     msg: "Todo updated successfully...",
//   });
// });

// 4. DELETE handler (CRUD: Delete)

app.delete("/todo", (req, res) => {
  const { target_todo } = req.body;
  const targetIndexelement = todoArray.indexOf(target_todo);
  todoArray.splice(targetIndexelement, 1);

  console.log("todo delete request sent ", target_todo);

  res.json({ msg: "todo deleted successfully" });
  //   res.send("todo delete response received");
});
app.listen(8080, () => {
  console.log("server is running on port 8080 successfully");
});
