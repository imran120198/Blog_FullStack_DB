const express = require("express");
const cors = require("cors");

const { connection } = require("./Connection/Connection");
const { authentication } = require("./Middleware/Authentication");
const { BlogRoutes } = require("./Routes/Blog.route");
const { UserRoutes } = require("./Routes/User.route");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Blog App Server");
});

// Routes
app.use("/user", UserRoutes);

app.use(authentication);

app.use("/blog", BlogRoutes);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database(MongoDB Atlas)");
  } catch (err) {
    console.log("Not Connected to Database(MongoDB Atlas)");
    console.log(err);
  }
  console.log("Listening to PORT 8080");
});
