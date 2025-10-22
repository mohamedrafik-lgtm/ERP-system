// Dependency Injection Container following DIP
import { IStudentService } from './interfaces';
import { IDistributionService } from './interfaces';
import { IFilterService } from './interfaces';
import { IStatsService } from './interfaces';
import { StudentService } from './Services/StudentService';
import { DistributionService } from './Services/DistributionService';
import { FilterUtils } from './utils';
import { StatsUtils } from './utils';

export class DIContainer {
  private static instance: DIContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  private registerServices(): void {
    // Register concrete implementations
    this.services.set('IStudentService', new StudentService());
    this.services.set('IDistributionService', new DistributionService());
    this.services.set('IFilterService', FilterUtils);
    this.services.set('IStatsService', StatsUtils);
  }

  public get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return service as T;
  }

  public register<T>(serviceName: string, implementation: T): void {
    this.services.set(serviceName, implementation);
  }
}

// Factory for creating services
export class ServiceFactory {
  private static container = DIContainer.getInstance();

  static getStudentService(): IStudentService {
    return ServiceFactory.container.get<IStudentService>('IStudentService');
  }

  static getDistributionService(): IDistributionService {
    return ServiceFactory.container.get<IDistributionService>('IDistributionService');
  }

  static getFilterService(): IFilterService {
    return ServiceFactory.container.get<IFilterService>('IFilterService');
  }

  static getStatsService(): IStatsService {
    return ServiceFactory.container.get<IStatsService>('IStatsService');
  }
}

