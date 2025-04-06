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

export function getInitials(name: string | undefined) {
  if (name) {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
  }
  return undefined
}

export enum IGAlevel {
  SEM_ACNES = 'Sem acnes',
  LEVE = 'Leve',
  MODERADA = 'Moderada',
  GRAVE = 'Grave',
  MUITO_GRAVE = 'Muito grave',
}

export function getIgaLevel(igaScore: number): IGAlevel {
  if (igaScore === 0) {
    return IGAlevel.SEM_ACNES
  }
  if (igaScore <= 5) {
    return IGAlevel.LEVE
  }
  if (igaScore <= 15) {
    return IGAlevel.MODERADA
  }
  if (igaScore <= 30) {
    return IGAlevel.GRAVE
  }
  return IGAlevel.MUITO_GRAVE
}
