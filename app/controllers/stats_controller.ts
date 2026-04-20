import type { HttpContext } from '@adonisjs/core/http'
import statsService from '#services/stats_service'

export default class StatsController {
  async index({ response }: HttpContext) {
    return response.json(await statsService.getStats())
  }
}
