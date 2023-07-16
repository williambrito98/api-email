export class SendController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.to?.length) {
      return {
        statusCode: 400,
        message: new Error('Missing param: to')
      }
    }

    if (!httpRequest.body.from) {
      return {
        statusCode: 400,
        message: new Error('Missing param: from')
      }
    }

    if (!httpRequest.body.subject) {
      return {
        statusCode: 400,
        message: new Error('Missing param: subject')
      }
    }

    return {}
  }
}
