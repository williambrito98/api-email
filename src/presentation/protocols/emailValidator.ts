export interface EmailValidator {
  isValid: (email: string | string[]) => boolean
}
