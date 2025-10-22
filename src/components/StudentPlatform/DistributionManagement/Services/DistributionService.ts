// Distribution Service implementing ISP
import { Distribution } from '../types';
import { IDistributionService } from '../interfaces';

export class DistributionService implements IDistributionService {
  private distributions: Distribution[] = [];

  async getDistributions(): Promise<Distribution[]> {
    // In real implementation, this would fetch from API
    return this.distributions;
  }

  async getDistributionById(id: number): Promise<Distribution | null> {
    const distribution = this.distributions.find(d => d.id === id);
    return distribution || null;
  }

  async createDistribution(distribution: Omit<Distribution, 'id'>): Promise<Distribution> {
    const newDistribution: Distribution = {
      ...distribution,
      id: Date.now() // Simple ID generation
    };
    this.distributions.push(newDistribution);
    return newDistribution;
  }

  async updateDistribution(distribution: Distribution): Promise<Distribution> {
    const index = this.distributions.findIndex(d => d.id === distribution.id);
    if (index !== -1) {
      this.distributions[index] = distribution;
    }
    return distribution;
  }

  async deleteDistribution(id: number): Promise<boolean> {
    const index = this.distributions.findIndex(d => d.id === id);
    if (index !== -1) {
      this.distributions.splice(index, 1);
      return true;
    }
    return false;
  }
}

