import { Test, TestingModule } from '@nestjs/testing';
import { DirectionsService } from './directions.service';
import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

describe('DirectionsService', () => {
  let service: DirectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: GoogleMapsClient,
          useValue: { findPlaceFromText: jest.fn() },
        },
        DirectionsService,
      ],
    }).compile();

    service = module.get<DirectionsService>(DirectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
