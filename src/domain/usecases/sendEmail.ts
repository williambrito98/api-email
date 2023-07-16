export interface SendEmailModel {
  to: string[]
  subject: string
  from: string
  fields: Record<string, unknown>
  type_body: string

}

export interface SendEmail {
  send: (data: SendEmailModel) => boolean
}
