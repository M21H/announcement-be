import PostSchema from '../models/PostSchema.js'
import ApiError from '../helpers/apiError.js'

class PostService {
  async create(post) {
    const createdPost = await PostSchema.create(post)
    return createdPost
  }

  async getOne(id) {
    const post = await PostSchema.findById(id)
    return post
  }

  async getAll(query) {
    const { page = 1, size = 10, title } = query

    const limit = parseInt(size)
    const skip = (page - 1) * size

    let posts
    if (title) {
      posts = await PostSchema.find({ title }).limit(limit).skip(skip)
      return { page, size, title, data: posts }
    }
    posts = await PostSchema.find().limit(limit).skip(skip)
    return { page, size, data: posts }
  }

  async update(id, body) {
    const updatedPost = await PostSchema.findByIdAndUpdate(id, body, { new: true })
    return updatedPost
  }

  async delete(id) {
    const deletedPost = await Post.findByIdAndDelete(id)
    return deletedPost
  }
}

export default new PostService()