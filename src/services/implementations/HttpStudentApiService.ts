// Liskov Substitution Principle - يمكن استبدال implementations
import { BaseStudentApiService } from '../abstract/StudentApiService';
import { IStudentCreateRequest, IStudentUpdateRequest, IStudentListRequest, IStudentResponse, IPaginatedResponse } from '@/types/api.interfaces';

export class HttpStudentApiService extends BaseStudentApiService {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string = 'http://localhost:4000/api') {
    super();
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  // Base API methods
  async get<T>(url: string, params?: Record<string, any>): Promise<any> {
    const response = await fetch(this.buildUrl(url, params), {
      method: 'GET',
      headers: this.headers,
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(url: string, data?: any): Promise<any> {
    const response = await fetch(this.buildUrl(url), {
      method: 'POST',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(url: string, data?: any): Promise<any> {
    const response = await fetch(this.buildUrl(url), {
      method: 'PUT',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async patch<T>(url: string, data?: any): Promise<any> {
    const response = await fetch(this.buildUrl(url), {
      method: 'PATCH',
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(url: string): Promise<any> {
    const response = await fetch(this.buildUrl(url), {
      method: 'DELETE',
      headers: this.headers,
    });
    return this.handleResponse<T>(response);
  }

  // Student specific methods
  async createStudent(data: IStudentCreateRequest): Promise<IStudentResponse> {
    const response = await this.post<IStudentResponse>('/students', data);
    return response.data;
  }

  async updateStudent(id: number, data: IStudentUpdateRequest): Promise<IStudentResponse> {
    const response = await this.patch<IStudentResponse>(`/students/${id}`, data);
    return response.data;
  }

  async deleteStudent(id: number): Promise<void> {
    await this.delete(`/students/${id}`);
  }

  async getStudent(id: number): Promise<IStudentResponse> {
    const response = await this.get<IStudentResponse>(`/students/${id}`);
    return response.data;
  }

  async getStudents(params?: IStudentListRequest): Promise<IPaginatedResponse<IStudentResponse>> {
    const response = await this.get<IPaginatedResponse<IStudentResponse>>('/students', params);
    return response;
  }

  async searchStudents(query: string): Promise<IStudentResponse[]> {
    const response = await this.get<IStudentResponse[]>('/students/search', { q: query });
    return response.data || [];
  }

  async getStudentsByProgram(programId: number): Promise<IStudentResponse[]> {
    const response = await this.get<IStudentResponse[]>(`/programs/${programId}/students`);
    return response.data || [];
  }

  async getStudentStatistics(): Promise<any> {
    const response = await this.get<any>('/students/statistics');
    return response.data;
  }

  async exportStudents(format: 'excel' | 'pdf'): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/students/export?format=${format}`, {
      method: 'GET',
      headers: this.headers,
    });
    
    if (!response.ok) {
      throw new Error('فشل في تصدير البيانات');
    }
    
    return response.blob();
  }

  async importStudents(file: File): Promise<{ success: number; errors: any[] }> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${this.baseUrl}/students/import`, {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    return result.data;
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
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

  private async handleResponse<T>(response: Response): Promise<any> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'حدث خطأ في الطلب');
    }
    
    return data;
  }
}
