const { Router } = require("express");
const BlogRoutes = Router();

const { BlogModel } = require("../Model/Blog.model");

// get all the data
BlogRoutes.get("/", async (req, res) => {
  try {
    const getData = await BlogModel.find({});
    res.send({ message: "Get Data successfully", getData });
  } catch (err) {
    res.send({ message: "Something went wrong in getting data", err });
  }
});


// post blog Data
BlogRoutes.post("/create", async (req, res) => {
  try {
    const { title, image, description, date, likes, dislike } = req.body;
    const createBlog = new BlogModel({
      title,
      image,
      description,
      date,
      likes,
      dislike,
    });
    await createBlog.save();
    res.status(201).send({ message: "Create Blog Successfully", createBlog });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong in posting Data", err });
  }
});

// DELETE the data
BlogRoutes.delete("/delete/:blogId", async (req, res) => {
  const { blogId } = req.params;
  try {
    const deleteBlog = await BlogModel.findByIdAndDelete({
      _id: blogId,
    });
    if (deleteBlog) {
      res.status(201).send({ message: "Delete Blog Successfully", deleteBlog });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong in deleteing data", err });
  }
});

//Patch the data
BlogRoutes.patch("/edit/:blogId", async (req, res) => {
  const { blogId } = req.params;
  try {
    const EditBlog = await BlogModel.findByIdAndUpdate(
      { _id: blogId },
      req.body
    );
    res.status(201).send({ message: "Edit Blog Successfully", EditBlog });
  } catch (err) {
    res.status(500).send({ message: "Patch Blog", err });
  }
});

module.exports = {
  BlogRoutes,
};
