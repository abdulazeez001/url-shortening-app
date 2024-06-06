import Link from '#models/link'
import { nanoid } from 'nanoid'
import { removeProtocol } from '../support/helpers.js'
import CustomException from '../exceptions/custom_exception.js'

export default class LinkService {
  async shortener(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, description, website, userId, host } = data
        let baseUrl = host
        let backHalf = nanoid(6)
        let generatedUrl = `${baseUrl}/${backHalf}`

        const newLink = await Link.create({
          userId,
          name,
          description,
          shortUrl: backHalf,
          longUrl: removeProtocol(website) || undefined,
          generatedUrl,
        })
        resolve({
          success: true,
          message: 'URL shortened Successfully',
          data: newLink,
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async getLinks(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const { userId, page, limit } = payload
        const links = await Link.query().where('user_id', userId).paginate(page, limit)
        resolve(links)
      } catch (error) {
        reject(error)
      }
    })
  }

  async getLink(payload: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const { url } = payload
        if (!url) {
          throw new CustomException('Invalid Url', 422, '')
        }
        const linkDetail = await Link.findBy({ shortUrl: url })
        if (!linkDetail) {
          throw new CustomException('Url not found', 404, '')
        }
        resolve(linkDetail.longUrl)
      } catch (error) {
        reject(error)
      }
    })
  }
}
