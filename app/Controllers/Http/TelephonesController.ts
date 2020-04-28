import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TelephoneValidator from 'App/Validators/TelephoneValidator'
import Client from 'App/Models/Client'

export default class TelephonesController {
  public async index (ctx: HttpContextContract) {
    const {client_id} = await ctx.params
    console.log(client_id)
    console.log('get telephones')
    const client = await Client.query().where({id: client_id}).preload('telephones').first()
    console.log(client)
    return client
  }

  public async store (ctx: HttpContextContract) {
    const {client_id} = await ctx.params
    const dto = await ctx.request.validate(TelephoneValidator)

    const client = await Client.find(client_id)

    const telephone = await client?.related('telephones').create(dto)

    return telephone
  }

  public async show (ctx: HttpContextContract) {
  }

  public async update (ctx: HttpContextContract) {
  }

  public async destroy (ctx: HttpContextContract) {
  }
}
