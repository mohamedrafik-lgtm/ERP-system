// Dependency Inversion Principle - الاعتماد على abstractions
import { IBaseApiService } from './BaseApiService';
import { IStudentCreateRequest, IStudentUpdateRequest, IStudentListRequest, IStudentResponse, IPaginatedResponse } from '@/types/api.interfaces';

export interface IStudentApiService extends IBaseApiService {
  // Student CRUD operations
  createStudent(data: IStudentCreateRequest): Promise<IStudentResponse>;
  updateStudent(id: number, data: IStudentUpdateRequest): Promise<IStudentResponse>;
  deleteStudent(id: number): Promise<void>;
  getStudent(id: number): Promise<IStudentResponse>;
  getStudents(params?: IStudentListRequest): Promise<IPaginatedResponse<IStudentResponse>>;
  
  // Student specific operations
  searchStudents(query: string): Promise<IStudentResponse[]>;
  getStudentsByProgram(programId: number): Promise<IStudentResponse[]>;
  getStudentStatistics(): Promise<any>;
  exportStudents(format: 'excel' | 'pdf'): Promise<Blob>;
  importStudents(file: File): Promise<{ success: number; errors: any[] }>;
}

export abstract class BaseStudentApiService implements IStudentApiService {
  abstract get<T>(url: string, params?: Record<string, any>): Promise<any>;
  abstract post<T>(url: string, data?: any): Promise<any>;
  abstract put<T>(url: string, data?: any): Promise<any>;
  abstract patch<T>(url: string, data?: any): Promise<any>;
  abstract delete<T>(url: string): Promise<any>;

  abstract createStudent(data: IStudentCreateRequest): Promise<IStudentResponse>;
  abstract updateStudent(id: number, data: IStudentUpdateRequest): Promise<IStudentResponse>;
  abstract deleteStudent(id: number): Promise<void>;
  abstract getStudent(id: number): Promise<IStudentResponse>;
  abstract getStudents(params?: IStudentListRequest): Promise<IPaginatedResponse<IStudentResponse>>;
  abstract searchStudents(query: string): Promise<IStudentResponse[]>;
  abstract getStudentsByProgram(programId: number): Promise<IStudentResponse[]>;
  abstract getStudentStatistics(): Promise<any>;
  abstract exportStudents(format: 'excel' | 'pdf'): Promise<Blob>;
  abstract importStudents(file: File): Promise<{ success: number; errors: any[] }>;
}
