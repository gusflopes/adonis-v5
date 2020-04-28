import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/AuthService'
import UserValidator from 'App/Validators/UserValidator'

export default class SessionsController {
  private authService = new AuthService()

  public async register (ctx: HttpContextContract) {
    const data = await ctx.request.validate(UserValidator)

    const response = await this.authService.register(data)

    return response
  }

  public async login (ctx: HttpContextContract) {
    const {email, password} = ctx.request.post()

    const response = await this.authService.login({email, password})

    return response
  }
}
