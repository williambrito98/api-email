export class SendEmailError extends Error {
  constructor () {
    super('Não foi possivel enviar o email')
    this.name = 'SendEmailError'
  }
}
