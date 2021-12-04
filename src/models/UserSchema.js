import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: [true, 'please, provide a username'] },
		password: { type: String, required: [true, 'please, add a password'] },
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

export default mongoose.model('User', UserSchema)
