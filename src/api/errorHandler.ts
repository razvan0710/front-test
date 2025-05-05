import { AxiosError } from 'axios'

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const handleApiError = (error: any) => {
    if (error.response) {
      console.error('API error', error.response.status, error.response.data);
      return Promise.reject(error.response.data);  
    }
    console.error('Network/Other error', error);
    return Promise.reject(error);
  };