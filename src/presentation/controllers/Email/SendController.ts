import { badRequest } from '../../../helpers/httpHelpers'
import { InvalidParamError } from '../../errors/InvalidParamError'
import { MissingParamError } from '../../errors/MissingParamError'
import { type controller } from '../../protocols/controller'
import { type EmailValidator } from '../../protocols/emailValidator'
import { type HttpResponse, type HttpRequest } from './../../protocols/http'
export class SendController implements controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['to', 'from', 'subject', 'fields', 'type_body']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const invalidReceiver = httpRequest.body?.to.find((email: string) => !this.emailValidator.isValid(email))
    if (invalidReceiver) {
      return badRequest(new InvalidParamError('to'))
    }

    return {
      body: '',
      statusCode: 200
    }
  }
}
