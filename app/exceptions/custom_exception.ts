import { ExceptionHandler, HttpContext } from '@adonisjs/core/http'

export default class CustomException extends ExceptionHandler {
  message: string
  status: number
  data: any
  constructor(message: string, status: number, data: any) {
    super()
    this.message = message
    this.status = status
    this.data = data
  }

  async handle(ctx: HttpContext) {
    ctx.response.status(this.status).send({
      message: this.message,
      status: this.status,
      data: this.data,
    })
  }
}
