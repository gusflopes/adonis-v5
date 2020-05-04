import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TelephoneValidator from 'App/Validators/TelephoneValidator'
import Client from 'App/Models/Client'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Telephone from 'App/Models/Telephone'

export default class TelephonesController {
  public async index (ctx: HttpContextContract) {
    const {client_id} = await ctx.params
    console.log(client_id)
    console.log('get telephones')
    const client = await Client.query().where({id: client_id}).preload('telephones').first()
    if (!client) {
      throw new NotFoundException('Cliente não localizado')
    }
    return client
  }

  public async store (ctx: HttpContextContract) {
    const {client_id} = await ctx.params
    const dto = await ctx.request.validate(TelephoneValidator)

    const client = await Client.find(client_id)
    if (!client) {
      throw new NotFoundException('Cliente não localizado')
    }

    const telephone = await client?.related('telephones').create(dto)

    return telephone
  }

  public async update (ctx: HttpContextContract) {
    const {client_id, id} = ctx.params
    // fazer o validator
    const data = ctx.request.post()
    try {
      const telephone = await Telephone.find(id)
      console.log('o que?')
      if (telephone!.clientId === client_id) {
        console.log('o que? 2')
        telephone?.merge(data)
        await telephone?.save()
        return telephone
      }
      return ctx.response.status(401).json({message: 'Telefone não pertence ao usuário.'})
    } catch (err) {
      throw new NotFoundException('Telefone não localizado.')
    }
  }

  public async destroy (ctx: HttpContextContract) {
    const { client_id, id } = ctx.params
    try {
      const telephone = await Telephone.find(id)
      if (telephone!.clientId === client_id) {
        await telephone?.delete()
        return ctx.response.status(204)
      }
    }catch (err) {
      throw new NotFoundException('Telefone não localizado.')
    }
  }
}
