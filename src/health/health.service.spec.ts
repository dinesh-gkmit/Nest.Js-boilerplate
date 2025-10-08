import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return healthy status', async () => {
    const result = await service.isHealthy('test');
    expect(result).toBeDefined();
    expect(result.test.status).toBe('up');
  });

  it('should check database health', async () => {
    const result = await service.checkDatabase('database');
    expect(result).toBeDefined();
    expect(result.database.status).toBe('up');
  });

  it('should check external services health', async () => {
    const result = await service.checkExternalServices('external-services');
    expect(result).toBeDefined();
    expect(result['external-services'].status).toBe('up');
  });
});
