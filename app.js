import express from "express";
// we can use morgan middleware to log info after each request
import morgan from "morgan";
import mongoose from "mongoose";

import blogRoutes from "./routes/blogRoutes.js";

// creating express app
const app = express();

// connect to mongoDB
const dbURI =
  "mongodb+srv://salah_najem:salah1234@cluster0.hd9igzl.mongodb.net/NodeJS_tutorial?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    // listening for requests
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: "true" }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  // response.send('<p>Hello world</p>');
  // res.sendFile("./views/index.html", { root: __dirname });
  res.redirect("/blogs");
});

// blog routes
app.use("/blogs", blogRoutes);

app.get("/about", (req, res) => {
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404 Error" });
});
