import * as jwt from 'jsonwebtoken'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import authConfig from '../../config/auth'
// import {} from 'App/Exceptions/Handler'

export default class CheckJwt {
  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    const {authorization} = await ctx.request.headers()

    if (!authorization) {
      throw new Error('Missing JWT Token')
    }

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
