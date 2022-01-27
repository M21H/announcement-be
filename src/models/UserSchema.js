import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: [true, 'please, provide a username'] },
		password: { type: String, required: [true, 'please, provide a password'] },
		createdAt: { type: Date, default: Date.now },
	},
	{
		versionKey: false,
	}
)

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next()
	}
	try {
		const salt = await bcrypt.genSalt(7)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} catch (e) {
		next(e)
	}
})

UserSchema.methods.matchPasswords = async function (password) {
	return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id, username: this.username, createdAt: this.createdAt }, process.env.JWT_ACCESS_SECRET, {
		expiresIn: process.env.JWT_ACCESS_EXPIRE,
	})
}

export default mongoose.model('User', UserSchema)
