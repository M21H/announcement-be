import Post from '../models/Post.js'

class PostService {
  async create(post) {
    const createdPost = await Post.create(post)
    return createdPost
  }

  async getOne(id) {
    if (!id) {
      throw new Error('id not specified')
    }
    const post = await Post.findById(id)
    return post
  }

  async getAll(query) {
    const { page = 1, size = 2, title } = query

    const limit = parseInt(size)
    const skip = (page - 1) * size

    let posts
    if (title) {
      posts = await Post.find({ title }).limit(limit).skip(skip)
      return { page, size, title, data: posts }
    }
    posts = await Post.find().limit(limit).skip(skip)
    return { page, size, data: posts }
  }

  async update(id, body) {
    if (!id) {
      throw new Error('id not specified')
    }
    const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true })
    return updatedPost
  }

  async delete(id) {
    if (!id) {
      throw new Error('id not specified')
    }
    const deletedPost = await Post.findByIdAndDelete(id)
    return deletedPost
  }
}

export default new PostService()