// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";

// //1. Initialize dotenv first to access the environment variables

// dotenv.config({ path: "./utils/.env" });

// import { UserModel, TodoModel } from "./utils/db.js";
// // import { TodoModel } from "./utils/db.js";

// const authMiddleware = (req, res, next) => {
//   const token = req.headers["token"];
//   const payload = jwt.verify(token, process.env.JWT_SECRET);
//   if (!payload) {
//     res.json({ message: "invalid token/unauthorized user" });
//   }
//   req.userId = payload.userid;
//   next();
// };
// mongoose
//   .connect(process.env.DB_URL, {})
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//   })
//   .catch((err) => {
//     console.log("Error connecting to MongoDB:", err);
//   });

// const app = express();
// app.use(express.json());

// // mongoose.connect(process.env.PORT, {}).then(() => {
// //   console.log("Connected to MongoDB");
// // });

// const PORT = process.env.PORT || 8080;

// app.post("/signup", async (req, res) => {
//   const { username, email, password } = req.body;
//   const feedback = await UserModel.create({ username, email, password });
//   console.log("user signup successfully in database");
//   res.json({
//     message: "user signup successfully in database",
//     feedback,
//   });
// });

// app.post("/signin", async (req, res) => {
//   const { username, password } = req.body;

//   const findUser = await UserModel.findOne({
//     username: username,
//     password: password,
//   });
//   console.log("find user in database for signin route", findUser);
//   if (findUser == null) {
//     return res.status(401).json({
//       message: "invalid username or password",
//     });
//   }
//   const token = jwt.sign(
//     {
//       userid: findUser._id,
//     },
//     process.env.JWT_SECRET,
//   );

//   res.json({ message: "user signin successfully", token });
// });

// //TODO CRUD OPERATIONS

// app.use(authMiddleware);

// app.get("/todos", async (req, res) => {
//   const userId = req.userId;
//   const data = await TodoModel.find({ UserId: userId });
//   res.json({ message: "get all todos fetched route", data });
//   console.log("get todos data route");
// });
// app.post("/todos", async (req, res) => {
//   const { todo_name, isDone } = req.body;
//   let userId = req.userId;
//   let feedback = await TodoModel.create({
//     UserId: userId,
//     Todo_name: todo_name,
//     isDone: isDone,
//   });
//   res.json({ message: "create/add todo route", data: feedback });
//   console.log("create todo route");
// });
// app.put("/todos", async (req, res) => {
//   const { old_todo_name, new_todo_name, old_isDone, new_isDone } = req.body;
//   const userId = req.userId;
//   const feedback = await TodoModel.findOneAndUpdate(
//     { UserId: userId, todo_name: old_todo_name, isDone: old_isDone },
//     { Todo_name: new_todo_name, isDone: new_isDone },
//     { new: true },
//   );
//   res.json({ message: "update todo route", data: feedback });
//   console.log("update todo route");
// });
// app.delete("/todos", async (req, res) => {
//   let userId = req.userId;
//   const { Id } = req.params;
//   const feedback = await TodoModel.findOneAndDelete({
//     _id: id,
//     UserId: userId,
//   });
//   res.json({ message: "delete todo route", data: feedback });
//   console.log("delete todo route");
// });
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs"; // Import bcrypt for password hashing
import { z } from "zod"; // Import zod for input validation

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  email: z
    .string() 
    .email("Invalid email address")
    .max(20, "Email must be at most 255 characters long")
    .min(3, "Email must be at least 3 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(
      /^(?!.*\s)(?=.*[A-Z]).*$/,
      "Password must contain at least one uppercase letter and no spaces",
    ),
});

// 1. Initialize dotenv first to access the environment variables
dotenv.config({ path: "./utils/.env" });

import { UserModel, TodoModel } from "./utils/db.js";

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided. Unauthorized user." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userid;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid token. Unauthorized user." });
  }
};

// Database Connection
mongoose
  .connect(process.env.DB_URL, {})
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// User Routes
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const feedback = await UserModel.create({ username, email, password });
    console.log("User signup successfully in database");
    res.json({ message: "User signup successfully in database", feedback });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during signup", error: error.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await UserModel.findOne({ username, password });

    console.log("User signin successfully in database", findUser);

    if (!findUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userid: findUser._id }, process.env.JWT_SECRET);
    res.json({ message: "User signin successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during signin", error: error.message });
  }
});

// Protect all following routes with Auth Middleware
app.use(authMiddleware);

// TODO: CRUD OPERATIONS
app.get("/todos", async (req, res) => {
  const userId = req.userId;
  const data = await TodoModel.find({ UserId: userId });
  console.log("Get todos data route successfully triggered");
  res.json({ message: "All todos fetched successfully", data });
});

app.post("/todos", async (req, res) => {
  const { todo_name, isDone } = req.body;
  const userId = req.userId;
  const feedback = await TodoModel.create({
    UserId: userId,
    Todo_name: todo_name,
    isDone: isDone,
  });
  console.log("Create todo route successfully triggered");
  res.json({ message: "Todo added successfully", data: feedback });
});

app.put("/todos", async (req, res) => {
  const { old_todo_name, new_todo_name, old_isDone, new_isDone } = req.body;
  const userId = req.userId;

  // Make sure your query keys exactly match your Mongoose Schema definition (e.g., uppercase or lowercase)
  const feedback = await TodoModel.findOneAndUpdate(
    { UserId: userId, Todo_name: old_todo_name, isDone: old_isDone },
    { Todo_name: new_todo_name, isDone: new_isDone },
    { new: true },
  );
  console.log("Update todo route successfully triggered");
  res.json({ message: "Todo updated successfully", data: feedback });
});

// Changed route to accept dynamic ID parameter
app.delete("/todos/:id", async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const feedback = await TodoModel.findOneAndDelete({
    _id: id,
    UserId: userId,
  });
  console.log("Delete todo route successfully triggered");
  res.json({ message: "Todo deleted successfully", data: feedback });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
