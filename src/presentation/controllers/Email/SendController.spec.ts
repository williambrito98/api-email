import { InvalidParamError } from '../../errors/InvalidParamError'
import { MissingParamError } from '../../errors/MissingParamError'
import { type EmailValidator } from '../../protocols/emailValidator'
import { SendController } from './SendController'

interface SutTypes {
  sut: SendController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SendController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
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
})
