import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientsController {
  public async index (ctx: HttpContextContract) {
    console.log(ctx.request.authenticated.userId)
    return 'Private resource'
  }
}
