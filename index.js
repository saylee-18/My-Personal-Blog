import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 3000;
let posts = [];

app.use(express.static("public"));
const upload = multer({ dest: "uploads/" });

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const data = posts.map(post => ({
    imageUrl: post.imageUrl,
    caption: post.caption,
    blog: post.blog,
    id: post.id
}));
  res.render("index.ejs", {posts: data});   
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/help", (req, res) => {
    res.render("help.ejs");
});

app.post("/delete/:id", (req, res) => {
  const postID = req.params.id;
  posts = posts.filter(post => post.id !== postID);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const postID = req.params.id;
  const findPost = posts.filter(post => post.id === postID);
  res.render("edit.ejs", {posts : findPost}) ; 
});

app.post("/edit/:id", upload.single("image"), (req, res) => {
  const postID = req.params.id;

  const findPost = posts.findIndex(post => post.id === postID);
  posts[findPost].id = Date.now().toString();
  posts[findPost].caption = req.body["caption"];
  posts[findPost].blog = req.body["blog"];
  posts[findPost].imageUrl = "/uploads/" + req.file.filename;
  res.redirect("/");
});

app.post("/create", upload.single("image"), (req, res) => {
  const id = Date.now().toString();
  const caption = req.body["caption"];
  const blog = req.body["blog"];
  const imageUrl = "/uploads/" + req.file.filename;
  const newPost = { 
    caption,
    imageUrl,
    blog, 
    id
  };
  posts.push(newPost);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


