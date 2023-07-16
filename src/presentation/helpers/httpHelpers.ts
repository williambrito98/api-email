import { ServerError } from '../errors/ServerError'
import { type HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    message: error
  }
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})