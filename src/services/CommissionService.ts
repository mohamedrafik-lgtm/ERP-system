import { Commission, CommissionsResponse, CommissionFilters, CommissionStats } from '@/types/commission.types';
import Cookies from 'js-cookie';

class CommissionService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  // Get all commissions with filters
  async getCommissions(filters?: CommissionFilters): Promise<CommissionsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.type) queryParams.append('type', filters.type);
      if (filters?.marketingEmployeeId) queryParams.append('marketingEmployeeId', filters.marketingEmployeeId.toString());
      if (filters?.traineeId) queryParams.append('traineeId', filters.traineeId.toString());
      if (filters?.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
      if (filters?.dateTo) queryParams.append('dateTo', filters.dateTo);
      if (filters?.search) queryParams.append('search', filters.search);

      const response = await fetch(`${this.baseUrl}/api/commissions?${queryParams.toString()}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          headers: Object.fromEntries(response.headers.entries()),
          body: errorText
        });
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching commissions:', error);
      throw error;
    }
  }

  // Get commission by ID
  async getCommissionById(id: number): Promise<Commission> {
    try {
      const response = await fetch(`${this.baseUrl}/api/commissions/${id}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching commission:', error);
      throw error;
    }
  }

  // Create new commission
  async createCommission(commissionData: Partial<Commission>): Promise<Commission> {
    try {
      const response = await fetch(`${this.baseUrl}/api/commissions`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(commissionData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating commission:', error);
      throw error;
    }
  }

  // Update commission
  async updateCommission(id: number, commissionData: Partial<Commission>): Promise<Commission> {
    try {
      const response = await fetch(`${this.baseUrl}/api/commissions/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(commissionData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating commission:', error);
      throw error;
    }
  }

  // Delete commission
  async deleteCommission(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/commissions/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting commission:', error);
      throw error;
    }
  }

  // Pay commission
  async payCommission(id: number, paidBy: string, notes?: string): Promise<Commission> {
    try {
      const response = await fetch(`${this.baseUrl}/api/commissions/${id}/pay`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ paidBy, notes })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error paying commission:', error);
      throw error;
    }
  }

  // Get commission statistics
  async getCommissionStats(filters?: CommissionFilters): Promise<CommissionStats> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.type) queryParams.append('type', filters.type);
      if (filters?.marketingEmployeeId) queryParams.append('marketingEmployeeId', filters.marketingEmployeeId.toString());
      if (filters?.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
      if (filters?.dateTo) queryParams.append('dateTo', filters.dateTo);

      const response = await fetch(`${this.baseUrl}/api/commissions/stats?${queryParams.toString()}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching commission stats:', error);
      throw error;
    }
  }

  // Export commissions to Excel
  async exportCommissions(filters?: CommissionFilters): Promise<Blob> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.type) queryParams.append('type', filters.type);
      if (filters?.marketingEmployeeId) queryParams.append('marketingEmployeeId', filters.marketingEmployeeId.toString());
      if (filters?.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
      if (filters?.dateTo) queryParams.append('dateTo', filters.dateTo);

      const response = await fetch(`${this.baseUrl}/api/commissions/export?${queryParams.toString()}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error exporting commissions:', error);
      throw error;
    }
  }

  // Helper method to get auth token
  private getAuthToken(): string {
    // Try different token storage methods, prioritizing Cookies
    return Cookies.get('access_token') || 
           Cookies.get('auth_token') || 
           (typeof window !== 'undefined' ? localStorage.getItem('access_token') : '') ||
           (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : '') ||
           (typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : '') ||
           (typeof window !== 'undefined' ? sessionStorage.getItem('auth_token') : '') ||
           '';
  }

  // Helper method to get headers
  private getHeaders(): HeadersInit {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('Using token for API request:', token.substring(0, 20) + '...');
    } else {
      console.warn('No authentication token found!');
      console.log('Available cookies:', {
        access_token: Cookies.get('access_token'),
        auth_token: Cookies.get('auth_token')
      });
    }
    
    return headers;
  }
}

export default new CommissionService();
