import { badRequest, serverError } from '../../helpers/httpHelpers'
import { InvalidParamError } from '../../errors/InvalidParamError'
import { MissingParamError } from '../../errors/MissingParamError'
import { type SendEmail } from '../../../domain/usecases/sendEmail'
import { type EmailValidator, type HttpRequest, type HttpResponse, type controller } from './emailProtocols'
export class SendController implements controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly sendEmail: SendEmail
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['to', 'from', 'subject', 'fields', 'type_body']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { to, from, subject, fields, type_body } = httpRequest.body

      const isValidReceiver = this.emailValidator.isValid(to)
      if (!isValidReceiver) {
        return badRequest(new InvalidParamError('to'))
      }

      this.sendEmail.send({
        to,
        from,
        subject,
        fields,
        type_body
      })

      return {
        body: '',
        statusCode: 200
      }
    } catch (error) {
      return serverError()
    }
  }
}
