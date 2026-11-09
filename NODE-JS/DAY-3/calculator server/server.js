import express from "express";
import cors from "cors";
const app = express();

app.get("/sum", (req, res) => {
  const { a, b } = req.query;
  console.log(typeof a);
  let result = Number(a) + Number(b);
  res.json({ message: "Sum request received successfully", sum: result });
});
app.get("/sub/:a/:b", (req, res) => {
  const { a, b } = req.params;
  let result = parseInt(a) - parseInt(b);
  res.json({
    message: "Subtraction request received successfully",
    sub: result,
  });
});

app.get("/mul/:a/:b", (req, res) => {
  const { a, b } = req.params;
  let result = parseInt(a) * parseInt(b);
  res.json({
    message: "Multiplication request received successfully",
    mul: result,
  });
});

app.get("/div/:a/:b", (req, res) => {
  const { a, b } = req.params;
  let result = parseInt(a) / parseInt(b);
  res.json({
    message: "Division request received successfully",
    div: result,
  });
});

app.get("*path", (req, res) => {
  res.json({ message: "This is an invalid request" });
});

app.listen("8080", () => {
  console.log("Server is running on port 8080");
});
