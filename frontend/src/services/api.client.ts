type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4010/api';

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  auth?: boolean;
};

export class ApiClient {
  static get accessToken() {
    return localStorage.getItem('tf_access_token');
  }

  static setTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem('tf_access_token', accessToken);
    if (refreshToken) localStorage.setItem('tf_refresh_token', refreshToken);
  }

  static clearTokens() {
    localStorage.removeItem('tf_access_token');
    localStorage.removeItem('tf_refresh_token');
  }

  static async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (options.auth !== false && this.accessToken) headers.Authorization = `Bearer ${this.accessToken}`;

    const response = await fetch(`${API_URL}${path.startsWith('/') ? path : `/${path}`}`, {
      method: options.method || 'GET',
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });

    if (response.status === 401 && options.auth !== false) {
      const refreshed = await this.refresh();
      if (refreshed) return this.request<T>(path, options);
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorBody.message || 'API request failed');
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      return response.json() as Promise<T>;
    }
    return response as T;
  }

  static async refresh() {
    const refreshToken = localStorage.getItem('tf_refresh_token');
    if (!refreshToken) return false;
    try {
      const data = await this.request<{ accessToken: string }>('/auth/refresh', { method: 'POST', body: { refreshToken }, auth: false });
      localStorage.setItem('tf_access_token', data.accessToken);
      return true;
    } catch {
      this.clearTokens();
      return false;
    }
  }

  static get<T>(path: string) {
    return this.request<T>(path);
  }

  static post<T>(path: string, body?: unknown, auth = true) {
    return this.request<T>(path, { method: 'POST', body, auth });
  }

  static put<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: 'PUT', body });
  }

  static delete<T>(path: string) {
    return this.request<T>(path, { method: 'DELETE' });
  }
}
