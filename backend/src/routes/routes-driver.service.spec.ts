import { Test, TestingModule } from '@nestjs/testing';
import { RoutesDriverService } from './routes-driver.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('RoutesDriverService', () => {
  let service: RoutesDriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoutesDriverService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RoutesDriverService>(RoutesDriverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
