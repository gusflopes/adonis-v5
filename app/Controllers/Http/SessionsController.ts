import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import authConfig from '../../../config/auth'
import * as jwt from 'jsonwebtoken'

export default class SessionsController {
  public async login (ctx: HttpContextContract) {
    const {email, password} = ctx.request.post()

    const user = await User.query().where({email: email}).first()
    if (!user) {
      throw new Error('Invalid credentials')
    }

    if (!(await user.checkPassword(password))) {
      throw new Error('Invalid credentials')
    }

    const token = this.createToken({userId: user.id})
    // criar token

    const response = {
      user: {
        id: user.id, name: user.name, email: user.email,
      }, token }

    return response
  }

  private createToken (data: any) {
    const {userId} = data
    if (!userId) {
      throw new Error('missing user details.')
    }
    const secret = authConfig.secret
    const expiresIn = authConfig.expiresIn
    const payload = {
      iss: process.env.APP_NAME || 'app',
      sub: userId,
    }
    return {
      expiresIn: expiresIn,
      token: jwt.sign(payload, secret, {expiresIn}),
    }
  }
}
