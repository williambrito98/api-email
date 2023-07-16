import { MissingParamError } from '../../errors/MissingParamError'
import { type HttpResponse, type HttpRequest } from './../../protocols/http'
export class SendController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.to?.length) {
      return {
        statusCode: 400,
        body: {
          message: new MissingParamError('to')
        }
      }
    }

    if (!httpRequest.body.from) {
      return {
        statusCode: 400,
        body: {
          message: new MissingParamError('from')
        }
      }
    }

    if (!httpRequest.body.subject) {
      return {
        statusCode: 400,
        body: {
          message: new MissingParamError('subject')
        }
      }
    }

    if (!httpRequest.body.fields) {
      return {
        statusCode: 400,
        body: {
          message: new MissingParamError('fields')
        }
      }
    }

    if (!httpRequest.body.type_body) {
      return {
        statusCode: 400,
        body: {
          message: new MissingParamError('type_body')
        }
      }
    }

    return {
      body: '',
      statusCode: 200
    }
  }
}
