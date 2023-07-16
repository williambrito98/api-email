export class ServerError extends Error {
  constructor () {
    super('Internal server erro')
    this.name = 'ServerError'
  }
}
