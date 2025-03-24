import { AxiosError } from 'axios'

export function getAxiosStatusCode(error: unknown) {
  const statusCode = error instanceof AxiosError ? error.response?.status : null
  return statusCode
}

export function getErrorMessage(error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : 'underfined error'
  return errorMessage
}
