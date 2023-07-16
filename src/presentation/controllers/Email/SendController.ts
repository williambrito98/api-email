import { badRequest } from '../../../helpers/httpHelpers'
import { MissingParamError } from '../../errors/MissingParamError'
import { type HttpResponse, type HttpRequest } from './../../protocols/http'
export class SendController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.to?.length) {
      return badRequest(new MissingParamError('to'))
    }

    if (!httpRequest.body.from) {
      return badRequest(new MissingParamError('from'))
    }

    if (!httpRequest.body.subject) {
      return badRequest(new MissingParamError('subject'))
    }

    if (!httpRequest.body.fields) {
      return badRequest(new MissingParamError('fields'))
    }

    if (!httpRequest.body.type_body) {
      return badRequest(new MissingParamError('type_body'))
    }

    return {
      body: '',
      statusCode: 200
    }
  }
}
