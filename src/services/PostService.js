import PostSchema from '../models/PostSchema.js'

class PostService {
	async create(post) {
		const createdPost = await PostSchema.create(post)
		return createdPost
	}

	async getOne(id) {
		const post = await PostSchema.findOne({ _id: id })
		return post
	}

	async getAll(query) {
		const { page = 1, size = 5, title } = query

		const limit = size * 1
		const skip = (page - 1) * size

		let posts
		const { length: totalLength } = await PostSchema.find()

		if (title) {
			posts = await PostSchema.find({ title }).limit(size).skip(skip)
			const similar = await PostSchema.find({
				$and: [{ title: { $regex: title } }, { desc: { $regex: title } }],
			}).limit(3)
			return { total: totalLength, title, data: { posts, similar } }
		}
		posts = await PostSchema.find().limit(limit).skip(skip)
		return { total: totalLength, data: posts }
	}

	async update(id, body) {
		const updatedPost = await PostSchema.findByIdAndUpdate(id, body, { new: true })
		return updatedPost
	}

	async delete(id) {
		const deletedPost = await PostSchema.findByIdAndDelete(id)
		return deletedPost
	}
}

export default new PostService()
