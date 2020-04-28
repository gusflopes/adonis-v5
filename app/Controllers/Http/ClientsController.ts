import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import ClientValidator from 'App/Validators/ClientValidator'
import NotFoundException from 'App/Exceptions/NotFoundException'

export default class ClientsController {
  public async index (ctx: HttpContextContract) {
    const clients = await Client.all()
    return clients
  }

  public async store ({request}: HttpContextContract) {
    const dto = await request.validate(ClientValidator)

    const client = await Client.create(dto)

    return client
  }

  public async show (ctx: HttpContextContract) {
    const {id} = ctx.params
    try {
      const client = await Client.find(id)
      return client
    } catch (err) {
      throw new NotFoundException('Cliente não localizado.', 404)
    }
  }

  public async update (ctx:HttpContextContract) {
    const dto = await ctx.request.validate(ClientValidator)
    const {id} = ctx.params

    try {
      const client = await Client.find(id)

      client?.merge(dto)
      await client?.save()

      return client
    } catch (err) {
      throw new NotFoundException('Cliente não localizado.', 404)
    }
  }

  public async destroy (ctx: HttpContextContract) {
    const {id} = ctx.params
    try {
      await Client.query().where({id: id}).delete()

      return ctx.response.status(204)
    } catch (err) {
      throw new NotFoundException('Cliente não localizado.', 404)
    }
  }
}
