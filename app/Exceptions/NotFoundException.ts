import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@poppinss/utils` allows defining
| a status code and error code for every exception.
|
| @example
| new {{ filename }}('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotFoundException extends Exception {
  /**
   * The handle method allows you to self handle the exception and
   * return an HTTP response.
   *
   * This is how it works under the hood.
   *
   * - You raise this exception
   * - The exception goes uncatched/unhandled through out the entire HTTP request cycle.
   * - Just before making the response. AdonisJS will call the `handle` method.
   *   Giving you a chance to convert the exception to response.
   *
   */

  ///////////////////////////////////////////
  //                                       //
  // Deprecated - delete this later        //
  // constructor(message: string) {        //
  //   super(message, 404)                 //
  // }                                     //
  //                                       //
  ///////////////////////////////////////////

  /**
   * Implement the handle method to manually handle this exception.
   * Otherwise it will be handled by the global exception handler.
   */
  public async handle (error: this, ctx: HttpContextContract) {
    ctx.response
      .status(error.status || 404)
      .send(error.message)
  }
}
