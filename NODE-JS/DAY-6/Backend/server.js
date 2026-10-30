import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

const JWT_SECRET = "I love biryani";

app.use(cors());
app.use(express.json());

let userArr = [];

const authMiddleware = (req, res, next) => {
  const userToken =
    req.headers["token"] || req.headers.authorization?.replace("Bearer ", "");

  if (!userToken) {
    return res.status(401).json({
      msg: "token missing",
    });
  }

  try {
    const verifyPayload = jwt.verify(userToken, JWT_SECRET);
    req.payload = verifyPayload;
    return next();
  } catch (error) {
    return res.status(401).json({
      msg: "invalid token!",
    });
  }
};

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  userArr.push({ username, password, email });

  console.log(userArr);

  return res.status(201).json({
    msg: "User registered successfully",
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const foundUser = userArr.find((userObj) => {
    return userObj.username === username && userObj.password === password;
  });

  if (!foundUser) {
    return res.status(401).json({
      msg: "invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      username: foundUser.username,
      message: "this token is for authentication...",
    },
    JWT_SECRET,
  );

  return res.json({
    msg: "signed in successfully",
    token,
  });
});

app.get("/courses", authMiddleware, (req, res) => {
  const { username } = req.payload;

  return res.json({
    data: {
      courseId: "77",
      courseName: "Data Analysis",
      password: "pass",
      material: "PYTHON, SQL",
      username,
    },
  });
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
