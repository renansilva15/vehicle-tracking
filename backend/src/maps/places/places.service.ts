import { Injectable } from '@nestjs/common';
import {
  Client as GoogleMapsClient,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlacesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly googleMapsClient: GoogleMapsClient,
  ) {}

  // TODO: Type the return value
  async findPlaces(text: string): Promise<any> {
    const { data } = await this.googleMapsClient.findPlaceFromText({
      params: {
        input: text,
        inputtype: PlaceInputType.textQuery,
        fields: ['place_id', 'formatted_address', 'geometry', 'name'],
        // TODO: Centralize environment variables
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      },
    });

    return data;
  }
}
