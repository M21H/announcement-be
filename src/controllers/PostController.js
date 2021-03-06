import ApiError from '../helpers/apiError.js'
import PostService from '../services/PostService.js'

class PostController {
	async create(req, res, next) {
		try {
			const { author, title, desc } = req.body
			if (!author || !title || !desc) {
				throw ApiError.badRequest('Missing required author or title or desc fields')
			}
			const post = await PostService.create({ author, title, desc })
			res.json(post)
		} catch (e) {
			next(e)
		}
	}
	
	async getOne(req, res, next) {
		console.log('params', req.params)
		try {
			const { id } = req.params
			if (!id) {
				throw ApiError.badRequest('id not specified')
			}
			const post = await PostService.getOne(id)
			res.json([post])
		} catch (e) {
			next(e)
		}
	}

	async getAll(req, res, next) {
		try {
			const posts = await PostService.getAll(req.query)
			res.json(posts)
		} catch (e) {
			next(e)
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params
			if (!id) {
				throw ApiError.badRequest('id not specified')
			}
			const post = await PostService.update(id, req.body)
			res.status(200).json(post)
		} catch (e) {
			return next(e)
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params
			if (!id) {
				throw ApiError.badRequest('id not specified')
			}
			const post = await PostService.delete(req.params.id)
			res.json(post._id)
		} catch (e) {
			next(e)
		}
	}
}

export default new PostController()
