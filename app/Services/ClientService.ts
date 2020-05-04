import Client from 'App/Models/Client'
import NotFoundException from 'App/Exceptions/NotFoundException'
import AuthorizationException from 'App/Exceptions/AuthorizationException'

export class ClientService {
  /**
   * Get Client with all his related details, like Telephone and Address.
   * It should fail only if the client doesn't exists.
   * @param clientId string as client_id from the request
   */
  public async getClientFullView (clientId: string) {
    console.log('here')
    try {
      const client = await Client.query()
        .where('id', clientId)
        .preload('address')
        .preload('telephones')
        .firstOrFail()
      return client
    } catch (err) {
      throw new NotFoundException('Client can\'t be found')
    }
  }

  /**
   * Verify if the Client already have an Address.
   * Each Client should have only One Address (1:1)
   * If he doesn't have an Address, create a new one with the provided data.
   * @param clientId client_id from the request
   * @param data Data to create an Address already validated
   */
  public async createAddress (clientId: string, data) {
    const client = await Client.query().where('id', clientId)
      .preload('address')
      .firstOrFail()
    if (!client.address) {
      console.log('no client address')
      const address = await client?.related('address').create(data)
      return { ...client.$attributes, address }
    }
    // return address ??
    console.log('have client address')
    throw new AuthorizationException('Client already have an Address. Update it instead.')
  }

  /**
   * Get only the client information without all related data like Address or Telephone
   * @param clientId string as client_id from the request
   */
  public async getClientOnly (clientId: string) {
    // Get Client
    const client = await Client.find(clientId)
    // console.log(client)
    if (!client) {
      throw new NotFoundException('Client can\'t be found')
    }
    // console.log('has client')
    return client
  }
}
