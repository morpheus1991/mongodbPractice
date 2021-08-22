const { Schema, model, Types } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    //islive가 트루면 노출, false면 비노출(임시저장)
    islive: { type: Boolean, default: false },
    //관계가 생김 ref:user부분은
    user: { type: Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

const Blog = model("blog", BlogSchema);

module.exports = { Blog };
