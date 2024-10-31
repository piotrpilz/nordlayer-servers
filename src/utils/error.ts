interface IApiError extends Error {
  statusCode: number | null
  details?: string | undefined
}

class ApiError extends Error implements IApiError{
  statusCode: number | null
  details: string | undefined

  constructor(message:string, statusCode:number, details?:string) {
    super(message);
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.details = details
  }
}

export default ApiError
