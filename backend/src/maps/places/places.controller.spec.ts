import { Test, TestingModule } from '@nestjs/testing';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { ConfigService } from '@nestjs/config';
import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js';

describe('PlacesController', () => {
  let controller: PlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [
        ConfigService,
        {
          provide: GoogleMapsClient,
          useValue: { findPlaceFromText: jest.fn() },
        },
        PlacesService,
      ],
    }).compile();

    controller = module.get<PlacesController>(PlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
