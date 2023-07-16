/*
    {
        to: string[],
        from: string,
        subject: string
        fields: {
            variable_1: string
            variable_2: string
            ....
        }
        type_body: string
    }
*/

import { SendController } from './SendController'

describe('Email: Send Controller', () => {
  test('Should return 400 if no receiver is provided', () => {
    const sut = new SendController()
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
    expect(httpResponse.message).toEqual(new Error('Missing param: to'))
  })

  test('Should return 400 if no sender is provided', () => {
    const sut = new SendController()
    const httpRequest = {
      body: {
        to: [],
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
    expect(httpResponse.message).toEqual(new Error('Missing param: from'))
  })
})
