import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async login (ctx: HttpContextContract) {
    const {email, password} = ctx.request.post()
    console.log(email, password)
    return 'OK'
  }
}
