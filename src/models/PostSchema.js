import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
})

export default mongoose.model('Post', PostSchema)

