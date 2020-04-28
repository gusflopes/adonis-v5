import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientsController {
  public async index (ctx: HttpContextContract) {
    return 'Private resource'
  }
}
