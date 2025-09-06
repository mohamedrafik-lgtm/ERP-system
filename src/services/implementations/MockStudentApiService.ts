// Liskov Substitution Principle - يمكن استبدال implementations
import { BaseStudentApiService } from '../abstract/StudentApiService';
import { IStudentCreateRequest, IStudentUpdateRequest, IStudentListRequest, IStudentResponse, IPaginatedResponse } from '@/types/api.interfaces';

export class MockStudentApiService extends BaseStudentApiService {
  private students: IStudentResponse[] = [];
  private nextId = 1;

  constructor() {
    super();
    this.initializeMockData();
  }

  // Base API methods
  async get<T>(url: string, params?: Record<string, any>): Promise<any> {
    await this.delay(500); // Simulate network delay
    return { success: true, data: null };
  }

  async post<T>(url: string, data?: any): Promise<any> {
    await this.delay(800);
    return { success: true, data: data };
  }

  async put<T>(url: string, data?: any): Promise<any> {
    await this.delay(600);
    return { success: true, data: data };
  }

  async patch<T>(url: string, data?: any): Promise<any> {
    await this.delay(600);
    return { success: true, data: data };
  }

  async delete<T>(url: string): Promise<any> {
    await this.delay(400);
    return { success: true, data: null };
  }

  // Student specific methods
  async createStudent(data: IStudentCreateRequest): Promise<IStudentResponse> {
    await this.delay(1000);
    
    const newStudent: IStudentResponse = {
      id: this.nextId++,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.students.push(newStudent);
    return newStudent;
  }

  async updateStudent(id: number, data: IStudentUpdateRequest): Promise<IStudentResponse> {
    await this.delay(800);
    
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('الطالب غير موجود');
    }
    
    this.students[index] = {
      ...this.students[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return this.students[index];
  }

  async deleteStudent(id: number): Promise<void> {
    await this.delay(600);
    
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('الطالب غير موجود');
    }
    
    this.students.splice(index, 1);
  }

  async getStudent(id: number): Promise<IStudentResponse> {
    await this.delay(300);
    
    const student = this.students.find(s => s.id === id);
    if (!student) {
      throw new Error('الطالب غير موجود');
    }
    
    return student;
  }

  async getStudents(params?: IStudentListRequest): Promise<IPaginatedResponse<IStudentResponse>> {
    await this.delay(500);
    
    let filteredStudents = [...this.students];
    
    // Apply filters
    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredStudents = filteredStudents.filter(s => 
        s.nameArabic.toLowerCase().includes(search) ||
        s.nameEnglish.toLowerCase().includes(search) ||
        s.nationalId.includes(search)
      );
    }
    
    if (params?.program) {
      filteredStudents = filteredStudents.filter(s => s.program === params.program);
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);
    
    return {
      success: true,
      message: 'تم جلب البيانات بنجاح',
      data: paginatedStudents,
      meta: {
        total: filteredStudents.length,
        page,
        limit,
        totalPages: Math.ceil(filteredStudents.length / limit),
      },
    };
  }

  async searchStudents(query: string): Promise<IStudentResponse[]> {
    await this.delay(400);
    
    const search = query.toLowerCase();
    return this.students.filter(s => 
      s.nameArabic.toLowerCase().includes(search) ||
      s.nameEnglish.toLowerCase().includes(search) ||
      s.nationalId.includes(search)
    );
  }

  async getStudentsByProgram(programId: number): Promise<IStudentResponse[]> {
    await this.delay(400);
    
    return this.students.filter(s => s.program === programId.toString());
  }

  async getStudentStatistics(): Promise<any> {
    await this.delay(300);
    
    const total = this.students.length;
    const byGender = this.students.reduce((acc, s) => {
      acc[s.gender] = (acc[s.gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byProgram = this.students.reduce((acc, s) => {
      acc[s.program] = (acc[s.program] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total,
      byGender,
      byProgram,
      active: total,
      inactive: 0,
      graduated: 0,
    };
  }

  async exportStudents(format: 'excel' | 'pdf'): Promise<Blob> {
    await this.delay(2000);
    
    // Create a mock blob
    const data = JSON.stringify(this.students, null, 2);
    const blob = new Blob([data], { 
      type: format === 'excel' ? 'application/vnd.ms-excel' : 'application/pdf' 
    });
    
    return blob;
  }

  async importStudents(file: File): Promise<{ success: number; errors: any[] }> {
    await this.delay(3000);
    
    // Mock import - simulate some success and errors
    const mockResult = {
      success: Math.floor(Math.random() * 10) + 1,
      errors: Math.random() > 0.5 ? [
        { row: 2, message: 'رقم الهوية مكرر' },
        { row: 5, message: 'البريد الإلكتروني غير صحيح' }
      ] : []
    };
    
    return mockResult;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private initializeMockData(): void {
    // Add some mock students
    this.students = [
      {
        id: 1,
        nameArabic: 'أحمد محمد علي',
        nameEnglish: 'Ahmed Mohamed Ali',
        nationalId: '12345678901234',
        dateOfBirth: '1995-01-15',
        placeOfBirth: 'القاهرة',
        gender: 'MALE',
        nationality: 'مصري',
        religion: 'ISLAM',
        maritalState: 'SINGLE',
        admissionSystem: 'REGULAR',
        marketer: 'محمود أحمد',
        programType: 'SUMMER',
        program: '1',
        releaseDate: '2023-01-01',
        expirationDate: '2024-01-01',
        The_state: 'القاهرة',
        Governorate: 'القاهرة',
        city: 'المعادي',
        address: 'شارع التحرير',
        mobileNumber: '01234567890',
        email: 'ahmed@example.com',
        ParentMobile: '01234567891',
        ParentEmail: 'parent@example.com',
        GuardianJob: 'مهندس',
        RelationshipWithTheGuardian: 'أب',
        NationalIDOfTheGuardian: '12345678901235',
        TypeOfEducation: 'عام',
        School_Center_Name: 'مدرسة النهضة',
        DateOfObtainingTheQualification: '2020-06-01',
        HighSchoolTotal: '400',
        HighSchoolPercentage: '85',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
      // Add more mock data as needed
    ];
  }
}
