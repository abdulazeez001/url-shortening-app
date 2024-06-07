import User from '#models/user'
import CustomException from '../exceptions/custom_exception.js'

export default class AuthService {
  async login(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password } = data
        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user)
        resolve({
          token: token,
          user: { ...user.serialize() },
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async register(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, confirmPassword, password } = payload
        if (password !== confirmPassword) {
          throw new CustomException('Password and Confirm Password Mismatch!', 402, {})
        }
        const userAlreadyExist = await User.findBy({ email })
        if (userAlreadyExist) {
          throw new CustomException('User already exist!', 403, {})
        }
        const user = await User.create({ email, password })
        const token = await User.accessTokens.create(user)

        resolve({
          token: token,
          user: { ...user.serialize() },
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async logout(auth: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = auth.getUserOrFail()
        const token = auth.user?.currentAccessToken.identifier

        if (!token) {
          throw new CustomException('Token not found', 404, {})
        }
        await User.accessTokens.delete(user, token)

        resolve({})
      } catch (error) {
        reject(error)
      }
    })
  }
}
