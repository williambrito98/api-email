import { type SendEmail, type SendEmailModel } from '../../../domain/usecases/sendEmail'
import { InvalidParamError } from '../../errors/InvalidParamError'
import { MissingParamError } from '../../errors/MissingParamError'
import { ServerError } from '../../errors/ServerError'
import { type EmailValidator } from '../../protocols/emailValidator'
import { SendController } from './SendController'

interface SutTypes {
  sut: SendController
  emailValidatorStub: EmailValidator
  sendEmailStub: SendEmail
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string | string[]): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSendEmail = (): SendEmail => {
  class SendEmailStub implements SendEmail {
    send (data: SendEmailModel): boolean {
      return true
    }
  }
  return new SendEmailStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sendEmailStub = makeSendEmail()
  const sut = new SendController(emailValidatorStub, sendEmailStub)
  return {
    sut,
    emailValidatorStub,
    sendEmailStub
  }
}

describe('Email: Send Controller', () => {
  test('Should return 400 if no receiver is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        from: 'email@mai.com',
        subject: 'subject',
        type_body: 'success',
        fields: {
          name: 'name',
          data: 'data'
        }
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toEqual(new MissingParamError('to'))
  })

  test('Should return 400 if no sender is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        to: [
          'email@mail.com'
        ],
        subject: 'subject',
        type_body: 'success',
        fields: {
          name: 'name',
          data: 'data'
        }
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toEqual(new MissingParamError('from'))
  })

  test('Should return 400 if no subject is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        to: [
          'email@mail.com'
        ],
        from: 'email@mail.com',
        type_body: 'success',
        fields: {
          name: 'name',
          data: 'data'
        }
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toEqual(new MissingParamError('subject'))
  })

  test('Should return 400 if no fields is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        to: [
          'email@mail.com'
        ],
        subject: 'subject',
        from: 'email@mail.com',
        type_body: 'success'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toEqual(new MissingParamError('fields'))
  })

  test('Should return 400 if no type_body is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        to: [
          'email@mail.com'
        ],
        subject: 'subject',
        from: 'email@mail.com',
        fields: {
          name: 'name',
          data: 'data'
        }
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toEqual(new MissingParamError('type_body'))
  })
  test('Should return 400 if an invalid receiver is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        to: [
          'invalid'
        ],
        subject: 'subject',
        from: 'email@mail.com',
        fields: {
          name: 'name',
          data: 'data'
        },
        type_body: 'success'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.message).toEqual(new InvalidParamError('to'))
  })

  test('Should call EmailValidator with correct receiver', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        to: [
          'invalid'
        ],
        subject: 'subject',
        from: 'email@mail.com',
        fields: {
          name: 'name',
          data: 'data'
        },
        type_body: 'success'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.to)
  })

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new ServerError()
    })

    const httpRequest = {
      body: {
        to: [
          'invalid'
        ],
        subject: 'subject',
        from: 'email@mail.com',
        fields: {
          name: 'name',
          data: 'data'
        },
        type_body: 'success'
      }
    }
    const httpReesponse = sut.handle(httpRequest)
    expect(httpReesponse.statusCode).toBe(500)
    expect(httpReesponse.body).toEqual(new ServerError())
  })

  test('Should call SendEmail with correct values', () => {
    const { sut, sendEmailStub } = makeSut()
    const isValidSpy = jest.spyOn(sendEmailStub, 'send')

    const httpRequest = {
      body: {
        to: [
          'invalid'
        ],
        subject: 'subject',
        from: 'email@mail.com',
        fields: {
          name: 'name',
          data: 'data'
        },
        type_body: 'success'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if SendEmail throws', () => {
    const { sut, sendEmailStub } = makeSut()
    jest.spyOn(sendEmailStub, 'send').mockImplementationOnce(() => {
      throw new ServerError()
    })

    const httpRequest = {
      body: {
        to: [
          'invalid'
        ],
        subject: 'subject',
        from: 'email@mail.com',
        fields: {
          name: 'name',
          data: 'data'
        },
        type_body: 'success'
      }
    }
    const httpReesponse = sut.handle(httpRequest)
    expect(httpReesponse.statusCode).toBe(500)
    expect(httpReesponse.body).toEqual(new ServerError())
  })
})
