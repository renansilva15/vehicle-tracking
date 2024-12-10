import { Test, TestingModule } from '@nestjs/testing';
import { DirectionsController } from './directions.controller';
import { DirectionsService } from './directions.service';
import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

describe('DirectionsController', () => {
  let controller: DirectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectionsController],
      providers: [
        ConfigService,
        {
          provide: GoogleMapsClient,
          useValue: { findPlaceFromText: jest.fn() },
        },
        DirectionsService,
      ],
    }).compile();

    controller = module.get<DirectionsController>(DirectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
