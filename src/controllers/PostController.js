import PostService from '../services/PostService.js'

class PostController {
  async create(req, res) {
    try {
      const post = await PostService.create(req.body)
      return res.json(post)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getOne(req, res) {
    try {
      const post = await PostService.getOne(req.params.id, req.query)
      return res.json(post)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll(req.query)
      return res.json(posts)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async update(req, res) {
    try {
      const post = await PostService.update(req.params.id, req.body)
      return res.json(post)
    } catch (e) {
      console.log(e)
      res.status(500).json(e.message)
    }
  }

  async delete(req, res) {
    try {
      const post = await PostService.delete(req.params.id)
      return res.json(post)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

export default new PostController()