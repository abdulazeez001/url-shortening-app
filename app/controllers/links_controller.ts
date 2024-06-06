import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { shotnerValidator } from '#validators/link'
import LinkService from '#services/link_service'

@inject()
export default class LinksController {
  constructor(protected linkService: LinkService) {}

  async shortner({ auth, request, response }: HttpContext) {
    const validatedRequest = await request.validateUsing(shotnerValidator)
    const shortnerResponse = await this.linkService.shortener({
      ...validatedRequest,
      userId: auth.user?.id,
      host: request.host(),
    })
    return response.created(shortnerResponse)
  }
  async getLinks({ auth, request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const shortnerResponse = await this.linkService.getLinks({
      userId: auth.user?.id,
      page,
      limit,
    })
    return response.ok(shortnerResponse)
  }
  async getLink({ response, params, request }: HttpContext) {
    const { url } = params
    const shortnerResponse = await this.linkService.getLink({
      url,
    })
    return response.redirect(`${request.protocol()}://${shortnerResponse}`)
  }
}
