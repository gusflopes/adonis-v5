import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ClientService } from 'App/Services/ClientService'
import AddressValidator from 'App/Validators/AddressValidator'
import Address from 'App/Models/Address'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Client from 'App/Models/Client'

export default class AddressesController {
  private clientService = new ClientService()
  /**
   * Validate request and create a new Address for the Client with provided client_id
   * @param ctx HttpContextContract
   */
  public async store (ctx: HttpContextContract) {
    const { client_id } = ctx.params
    const data = await ctx.request.validate(AddressValidator)
    // const data = await ctx.request.post()
    const address = await this.clientService.createAddress(client_id, data)
    return address
  }

  /**
   * Return Client's Addresses.
   * Currently only allowing one address for a given client.
   * @param ctx HttpContextContract
   */
  public async index (ctx: HttpContextContract) {
    const { client_id } = ctx.params
    const client = await Client.query().where({id: client_id}).preload('address').first()

    const address = await Address.query().where('clientId', client_id).preload('client').first()
    if (!client!.address) {
      throw new NotFoundException('Address not found.')
    }
    return client
  }

  public async update (ctx: HttpContextContract) {
    const { client_id, id } = ctx.params
    const data = await ctx.request.validate(AddressValidator)

    const address = await Address.find(id)
    if (address?.clientId === client_id) {
      address?.merge(data)
      await address?.save()
      return address
    }
    throw new NotFoundException('Address doesn\'t belong to that Client')
  }

  public async destroy (ctx: HttpContextContract) {
    const { client_id, id } = ctx.params
    const address = await Address.find(id)
    if (address?.clientId === client_id) {
      await address?.delete()
      return ctx.response.status(204)
    }
    throw new NotFoundException('Address doesn\'t belong to that Client')
  }
}
