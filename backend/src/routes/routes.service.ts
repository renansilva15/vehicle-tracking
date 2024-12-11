import { Injectable, NotFoundException } from '@nestjs/common';
import { DirectionsService } from 'src/maps/directions/directions.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { Route } from '@prisma/client';

@Injectable()
export class RoutesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly directionsService: DirectionsService,
  ) {}

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    const {
      available_travel_modes: availableTravelModes,
      geocoded_waypoints: geocodedWaypoints,
      routes,
      request,
    } = await this.directionsService.getDirections(
      createRouteDto.sourceId,
      createRouteDto.destinationId,
    );

    const legs = routes[0].legs[0];
    return this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          name: legs.start_address,
          location: {
            lat: legs.start_location.lat,
            lng: legs.start_location.lng,
          },
        },
        destination: {
          name: legs.end_address,
          location: {
            lat: legs.end_location.lat,
            lng: legs.end_location.lng,
          },
        },
        duration: legs.duration.value,
        distance: legs.distance.value,
        directions: JSON.parse(
          JSON.stringify({
            availableTravelModes,
            geocodedWaypoints,
            routes,
            request,
          }),
        ),
      },
    });
  }

  async findAll(): Promise<Route[]> {
    return this.prismaService.route.findMany();
  }

  async findOne(id: string): Promise<Route> {
    const route = await this.prismaService.route.findUnique({
      where: {
        id,
      },
    });

    if (!route) {
      throw new NotFoundException(`Route with id ${id} not found`);
    }

    return route;
  }
}
