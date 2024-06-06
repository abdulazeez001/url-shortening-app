import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: { status: number; messages: string; name: string }, ctx: HttpContext) {
    // return super.handle(error, ctx)
    ctx.response.status(error.status || 500).send({
      message: env.get('NODE_ENV') === 'development' ? error.messages : undefined,
      error: error.name,
    })
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
