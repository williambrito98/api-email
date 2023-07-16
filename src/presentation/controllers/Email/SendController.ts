import { badRequest } from '../../../helpers/httpHelpers'
import { MissingParamError } from '../../errors/MissingParamError'
import { type HttpResponse, type HttpRequest } from './../../protocols/http'
export class SendController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['to', 'from', 'subject', 'fields', 'type_body']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      body: '',
      statusCode: 200
    }
  }
}
