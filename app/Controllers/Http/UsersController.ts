import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async store (ctx: HttpContextContract) {
    const data = await ctx.request.validate(UserValidator)
    const user = await User.query().where({email: data.email}).first()
    if (!user) {
      const newUser = await User.create(data)
      return newUser
    }

    return 'Usuário já existe '
  }
}
