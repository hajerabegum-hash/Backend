import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import { z } from "zod";

import { UserModel, TodoModel } from "./utils/dataBase.js";

dotenv.config({ path: "./utils/.env" });

const jwtSecret = process.env.JWT_SECRET || "default-secret-key";

const signupSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email().min(3).max(255),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(/^(?=.*[A-Z])(?=\S+$).*$/),
});

const signinSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
});

const authMiddleware = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.userId = payload.userid;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

mongoose
  .connect(process.env.DB_URL, {})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log("MongoDB error:", err));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.post("/signup", async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.flatten() });
    }

    const { username, email, password } = parsed.data;
    const exists = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created",
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Signup error", error: error.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.flatten() });
    }

    const { username, password } = parsed.data;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userid: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    return res.json({ message: "Login success", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Signin error", error: error.message });
  }
});

app.use(authMiddleware);

app.get("/todos", async (req, res) => {
  try {
    const data = await TodoModel.find({ UserId: req.userId });
    res.json({ message: "Todos fetched", data });
  } catch (error) {
    res.status(500).json({ message: "Fetch error", error: error.message });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { todo_name, isDone } = req.body;
    const data = await TodoModel.create({
      UserId: req.userId,
      Todo_name: todo_name,
      isDone: isDone ?? false,
    });

    res.json({ message: "Todo created", data });
  } catch (error) {
    res.status(500).json({ message: "Create error", error: error.message });
  }
});

app.put("/todos", async (req, res) => {
  try {
    const { old_todo_name, new_todo_name, old_isDone, new_isDone } = req.body;

    const data = await TodoModel.findOneAndUpdate(
      { UserId: req.userId, Todo_name: old_todo_name, isDone: old_isDone },
      { Todo_name: new_todo_name, isDone: new_isDone },
      { new: true },
    );

    res.json({ message: "Todo updated", data });
  } catch (error) {
    res.status(500).json({ message: "Update error", error: error.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const data = await TodoModel.findOneAndDelete({
      _id: req.params.id,
      UserId: req.userId,
    });

    res.json({ message: "Todo deleted", data });
  } catch (error) {
    res.status(500).json({ message: "Delete error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});






