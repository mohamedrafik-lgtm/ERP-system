import { TraineeProfileResponse } from '@/types/trainee';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export class TraineeApiService {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async getProfile(): Promise<TraineeProfileResponse> {
    return this.makeRequest<TraineeProfileResponse>('/api/trainee-auth/profile');
  }

  static async updateProfile(data: Partial<TraineeProfileResponse>): Promise<TraineeProfileResponse> {
    return this.makeRequest<TraineeProfileResponse>('/api/trainee-auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export default TraineeApiService;
