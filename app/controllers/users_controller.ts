import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { registerValidator, loginValidator } from '#validators/auth'
import AuthService from '#services/auth_service'

@inject()
export default class AuthController {
  constructor(protected authService: AuthService) {}

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const loginResponse = await this.authService.login({ email, password })
    return response.ok(loginResponse)
  }
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const registerResponse = await this.authService.register(payload)
    return response.created(registerResponse)
  }
  async logout({ auth, response }: HttpContext) {
    await this.authService.logout(auth)
    return response.ok({ message: 'Logged out' })
  }
}
