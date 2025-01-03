import { Test, TestingModule } from '@nestjs/testing';
import { PlacesService } from './places.service';
import { ConfigService } from '@nestjs/config';
import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js';

describe('PlacesService', () => {
  let service: PlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: GoogleMapsClient,
          useValue: { findPlaceFromText: jest.fn() },
        },
        PlacesService,
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
