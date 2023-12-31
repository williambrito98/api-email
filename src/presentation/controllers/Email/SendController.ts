import { badRequest, serverError, success } from '../../helpers/httpHelpers'
import { InvalidParamError } from '../../errors/InvalidParamError'
import { MissingParamError } from '../../errors/MissingParamError'
import { type SendEmail } from '../../../domain/usecases/sendEmail'
import { type EmailValidator, type HttpRequest, type HttpResponse, type controller } from './emailProtocols'
import { SendEmailError } from '../../errors/SendEmailError'
export class SendController implements controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly sendEmail: SendEmail
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

      const isSendEmail = await this.sendEmail.send({
        to,
        from,
        subject,
        fields,
        type_body
      })

      if (!isSendEmail) {
        return badRequest(new SendEmailError())
      }

      return success('Email Enviado com Sucesso')
    } catch (error) {
      return serverError()
    }
  }
}
