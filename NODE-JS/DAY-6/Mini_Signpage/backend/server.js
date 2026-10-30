import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 8080;
const JWT_SECRET = "mySecretKey";

const users = [
  {
    username: "demo",
    password: "1234",
    email: "demo@example.com",
  },
];

app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token =
    req.headers.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: "invalid token" });
  }
};

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const alreadyExists = users.some((user) => user.username === username);
  if (alreadyExists) {
    return res.status(409).json({ msg: "User already exists" });
  }

  users.push({ username, password, email });

  return res.status(201).json({
    msg: "User registered successfully",
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  const foundUser = users.find(
    (user) => user.username === username && user.password === password,
  );

  if (!foundUser) {
    return res.status(401).json({ msg: "invalid username or password" });
  }

  const token = jwt.sign(
    {
      username: foundUser.username,
      message: "this token is for authentication...",
    },
    JWT_SECRET,
    { expiresIn: "1h" },
  );

  return res.status(200).json({
    msg: "signed in successfully",
    token,
  });
});

app.get("/courses", authMiddleware, (req, res) => {
  return res.json({
    data: {
      courseId: "77",
      courseName: "Data Analysis",
      material: "PYTHON, SQL",
      username: req.user.username,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
