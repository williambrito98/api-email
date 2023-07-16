export class SendController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.to) {
      return {
        statusCode: 400,
        message: new Error('Missing param: to')
      }
    }
    return {}
  }
}
