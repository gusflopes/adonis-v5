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
    // console.log(authorization)
    const [, token] = authorization.split(' ')

    try {
      const payload = jwt.verify(token, authConfig.secret) as any
      const authenticated: any = {}

      authenticated.userId = payload.sub
      ctx.request.authenticated = authenticated
    } catch(err) {
      console.log(err)
      throw new Error('Token is invalid.')
    }

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
