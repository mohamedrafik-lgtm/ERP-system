import { fetchAPI } from './api';

export interface TrainingProgram {
  id: number;
  nameAr: string;
  nameEn: string;
  description?: string;
  price: number;
  duration?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class TrainingProgramsAPI {
  private baseUrl = '/api/programs';

  // Get all training programs
  async getAll(): Promise<TrainingProgram[]> {
    const response = await fetchAPI(this.baseUrl);
    return response.programs || response.data || response;
  }

  // Get program by ID
  async getById(id: number): Promise<TrainingProgram> {
    const response = await fetchAPI(`${this.baseUrl}/${id}`);
    return response.program || response.data || response;
  }

  // Create new program
  async create(data: Partial<TrainingProgram>): Promise<TrainingProgram> {
    const response = await fetchAPI(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.program || response.data || response;
  }

  // Update program
  async update(id: number, data: Partial<TrainingProgram>): Promise<TrainingProgram> {
    const response = await fetchAPI(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.program || response.data || response;
  }

  // Delete program
  async delete(id: number): Promise<void> {
    await fetchAPI(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }
}

export const trainingProgramsAPI = new TrainingProgramsAPI();
