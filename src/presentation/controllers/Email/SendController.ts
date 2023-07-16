import { type HttpResponse, type HttpRequest } from './../../protocols/http'
export class SendController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.to?.length) {
      return {
        statusCode: 400,
        body: {
          message: new Error('Missing param: to')
        }
      }
    }

    if (!httpRequest.body.from) {
      return {
        statusCode: 400,
        body: {
          message: new Error('Missing param: from')
        }
      }
    }

    if (!httpRequest.body.subject) {
      return {
        statusCode: 400,
        body: {
          message: new Error('Missing param: subject')
        }
      }
    }

    if (!httpRequest.body.fields) {
      return {
        statusCode: 400,
        body: {
          message: new Error('Missing param: fields')
        }
      }
    }

    if (!httpRequest.body.type_body) {
      return {
        statusCode: 400,
        body: {
          message: new Error('Missing param: type_body')
        }
      }
    }

    return {
      body: '',
      statusCode: 200
    }
  }
}
