const express = require("express");
const app = express();
const { userRouter } = require("./routes/userRoute");
const { blogRouter } = require("./routes/blogRoute");
const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://mori:trayra21@mogodbtutorial.65gtq.mongodb.net/test?authSource=admin&replicaSet=atlas-7g9qre-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("mongoDB connected");
    app.use(express.json());
    ///user로 시작하면 userRouter사용
    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
    app.listen(3000, () => console.log("server listening on port 3000"));
  } catch (error) {
    console.log(error);
  }
};

server();
