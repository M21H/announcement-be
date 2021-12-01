import UserSchema from '../models/UserSchema'

class AuthService {
  async createUser(user) {
    const createdUser = await UserSchema.create(user)
    return createdUser
  }

  async getUser(username) {
    const user = await UserSchema.findOne({ username })
    return user
  }

  async deleteUser(id) {
    const deletedUser = await UserSchema.deleteOne({ _id: id })
    console.log(deletedUser)
    return deletedUser
  }
}

export default new AuthService()