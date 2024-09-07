export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
  error: string | null;
  timestamp: string;
}

export interface HttpOptions<U = unknown> {
  token?: string;
  params?: Record<string, unknown>;
  body?: U;
  headers?: HeadersInit;
}

export interface HttpClient {
  get<T = unknown>(path: string, options?: HttpOptions): Promise<T>;
  post<T = unknown, U = unknown>(
    path: string,
    options?: HttpOptions<U>
  ): Promise<T>;
  put<T = unknown, U = unknown>(
    path: string,
    options?: HttpOptions<U>
  ): Promise<T>;
  patch<T = unknown, U = unknown>(
    path: string,
    options?: HttpOptions<U>
  ): Promise<T>;
  delete<T = unknown>(path: string, options?: HttpOptions): Promise<T>;
}
