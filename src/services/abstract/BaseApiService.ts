// Dependency Inversion Principle - الاعتماد على abstractions
import { IApiResponse, IPaginationParams } from '@/types/api.interfaces';

export interface IBaseApiService {
  get<T>(url: string, params?: Record<string, any>): Promise<IApiResponse<T>>;
  post<T>(url: string, data?: any): Promise<IApiResponse<T>>;
  put<T>(url: string, data?: any): Promise<IApiResponse<T>>;
  patch<T>(url: string, data?: any): Promise<IApiResponse<T>>;
  delete<T>(url: string): Promise<IApiResponse<T>>;
}

export abstract class BaseApiService implements IBaseApiService {
  protected baseUrl: string;
  protected headers: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  abstract get<T>(url: string, params?: Record<string, any>): Promise<IApiResponse<T>>;
  abstract post<T>(url: string, data?: any): Promise<IApiResponse<T>>;
  abstract put<T>(url: string, data?: any): Promise<IApiResponse<T>>;
  abstract patch<T>(url: string, data?: any): Promise<IApiResponse<T>>;
  abstract delete<T>(url: string): Promise<IApiResponse<T>>;

  protected buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  protected async handleResponse<T>(response: Response): Promise<IApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'حدث خطأ في الطلب');
    }
    
    return data;
  }
}
