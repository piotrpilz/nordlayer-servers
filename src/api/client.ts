import ApiError from "@/utils/error"
import storage, { STORAGE_KEYS } from "@/utils/storage"
interface IApiClientOptions {
  auth?: boolean
}

class ApiClient {
  defaultOptions = {
    auth: false
  }

  getAuthToken() {
    return storage.getItem<string>(STORAGE_KEYS.AUTH_TOKEN)
  }

  getHeaders(options: IApiClientOptions):Record<string, string> {
    const config = Object.assign({}, this.defaultOptions, options)
    const headers:Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (config.auth) {
      const token:string | null = this.getAuthToken()

      if (!token) {
        throw new Error(`Cannot find auth token for this request`);
      }

      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  async get(url:string, options: IApiClientOptions = {}) {
    try {
      const response = await fetch(url, {
        headers: this.getHeaders(options)
      });

      if (!response.ok) {
        throw new ApiError('API error', response.status)
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch GET error:', error);
      throw error;
    }
  }

  async post(url: string, data: object, options: IApiClientOptions = {}) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(options),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new ApiError('API error', response.status)
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch POST error:', error);
      throw error;
    }
  }

  // ...
  // add more methods if needed
}

const apiClient = new ApiClient();

export default apiClient;
