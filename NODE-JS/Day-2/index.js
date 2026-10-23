import express from "express";
const app = express(); //creating app instance

//  ==========   /menu route ==========
app.get("/menu", (req, res) => {
  console.log("Menu get page requested");
  res.send("Welcome to the menu page");
});
app.post("/menu", (req, res) => {
  console.log("Menu post page requested");
  res.send("Welcome to the post menu page");
});

app.put("/menu", (req, res) => {
  console.log("Menu put page requested");
  res.send("Welcome to the put  menu page");
});

app.delete("/menu", (req, res) => {
  console.log("Menu page requested");
  res.send("Welcome to the deleted menu page");
});

// -----------    /restaurant route   -----------

// GET handler

app.get("/restaurant", (req, res) => {
  console.log("Restaurant page requested");
  res.send("Welcome to the restaurant page");
});

// POST handler
app.post("/restaurant", (req, res) => {
  console.log("Restaurant post page requested");
  res.send("Welcome to the post restaurant page");
});

// PUT handler
app.put("/restaurant", (req, res) => {
  console.log("Restaurant put page requested");
  res.send("Welcome to the put restaurant page");
});
// DELETE handler
app.delete("/restaurant", (req, res) => {
  console.log("Restaurant delete page requested");
  res.send("Welcome to the delete restaurant page");
});

// -----------    /me route   -----------

// GET handler

app.get("/me", (req, res) => {
  console.log("Me page requested");
  res.send("Welcome to the me page");
});
// POST handler
app.post("/me", (req, res) => {
  console.log("Me post page requested");
  res.send("Welcome to the post me page");
});
// PUT handler
app.put("/me", (req, res) => {
  console.log("Me put page requested");
  res.send("Welcome to the put me page");
});

// DELETE handler
app.delete("/me", (req, res) => {
  console.log("Me delete page requested");
  res.send("Welcome to the delete me page");
});

app.listen(8080, () => {
  console.log("server is successfully running on port number 8080");
});
