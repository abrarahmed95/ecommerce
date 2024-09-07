import { ApiResponse, HttpClient, HttpOptions } from "./types";

class HttpClientImpl implements HttpClient {
  constructor(public baseURL: string = "") {}

  private async request<T>(
    method: string,
    path: string,
    options?: HttpOptions
  ): Promise<T | undefined> {
    let url = `${this.baseURL}${path}`;

    if (options?.params) {
      const searchParams = new URLSearchParams(options?.params as any);

      url = `${url}?${searchParams.toString()}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(options?.token && { Authorization: `Bearer ${options.token}` }),
          ...options?.headers,
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      const data: T = await response.json();

      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  async get<T = any>(path: string, options?: HttpOptions): Promise<T> {
    return this.request<T>("GET", path, options) as T;
  }

  async post<T, U>(path: string, options?: HttpOptions): Promise<T> {
    return this.request<T>("POST", path, options) as T;
  }

  async put<T>(path: string, options?: HttpOptions): Promise<T> {
    return this.request<T>("PUT", path, options) as T;
  }

  async delete<T>(path: string, options?: HttpOptions): Promise<T> {
    return this.request<T>("DELETE", path, options) as T;
  }

  async patch<T>(path: string, options?: HttpOptions): Promise<T> {
    return this.request<T>("PATCH", path, options) as T;
  }
}

export function createClient(config?: { baseURL: string }): HttpClient {
  return new HttpClientImpl(config?.baseURL);
}
