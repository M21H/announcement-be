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

		const limit = size
		const skip = (page - 1) * size

		let posts
		if (title) {
			posts = await PostSchema.find({ title }).limit(size).skip(skip)
			const similar = await PostSchema.find({
				$and: [{ title: { $regex: title } }, { desc: { $regex: title } }],
			}).limit(3)
			console.log(similar)
			return { size, title, data: { posts, similar } }
		}
		posts = await PostSchema.find().limit(limit).skip(skip)
		return { size, data: posts }
	}

	async update(id, body) {
		const updatedPost = await PostSchema.findByIdAndUpdate(id, body, { new: true })
		return updatedPost
	}

	async delete(id) {
		const deletedPost = await PostSchema.deleteOne({ _id: id })
		return deletedPost
	}
}

export default new PostService()
