const { Router } = require("express");
const userRouter = Router();
const { User } = require("../models/User");
const mongoose = require("mongoose");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

userRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    //유효성검사
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
    const user = await User.findOne({ _id: userId });
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
  console.log(req.params);
});
userRouter.post("/", async (req, res) => {
  try {
    let = { username, name } = req.body;
    if (!username) return res.status(400).send({ err: "username is required" });
    if (!name || !name.first || !name.last)
      return res
        .status(400)
        .send({ err: "Both first and last names are required" });

    const user = new User(req.body);
    await user.save();
    return res.send({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

userRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid useId" });
    if (!age) return res.status(400).send({ err: "age is required" });
    if (typeof age !== "number")
      return res.status(400).send({ err: "age must be a number" });
    const user = await User.findOneAndDelete({ _id: userId });
    return res.send({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});
userRouter.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
    //미들웨어로도 처리 가능하긴함
    const { age, name } = req.body;
    if (!age && !name)
      return res.status(400).send({ err: "age or name is required" });
    if (typeof age !== "number" && typeof age !== "undefined") {
      console.log("언디파인드");
      return res.status(400).send({ err: "age must be a number" });
    }
    if (name && typeof name.first !== "string" && typeof name.last !== "string")
      return res.status(400).send({ err: "first and last name are strings" });
    // let updateBody = {};
    // if (age) updateBody.age = age;
    // if (name) updateBody.name = name;
    // const user = await User.findByIdAndUpdate(userId, updateBody, {
    //   new: true,
    // });
    const user = await User.findById(userId);
    console.log({ userBeforeEdit: user });
    if (age) user.age = age;
    if (name) user.name = name;
    console.log({ userAfterEdit: user });
    await user.save();
    return res.send({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = {
  userRouter,
};
