import { type HttpRequest, type HttpResponse } from './http'

export interface controller {
  handle: (httpRequest: HttpRequest) => HttpResponse
}
