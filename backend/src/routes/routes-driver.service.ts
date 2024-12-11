import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProcessRouteDto } from './dto/process-route.dto';

@Injectable()
export class RoutesDriverService {
  constructor(private readonly prismaService: PrismaService) {}

  async processRoute(processRouteDto: ProcessRouteDto): Promise<any> {
    return this.prismaService.routeDriver.upsert({
      include: {
        route: true,
      },
      where: { routeId: processRouteDto.routeId },
      create: {
        routeId: processRouteDto.routeId,
        points: {
          set: {
            location: {
              lat: processRouteDto.lat,
              lng: processRouteDto.lng,
            },
          },
        },
      },
      update: {
        points: {
          push: {
            location: {
              lat: processRouteDto.lat,
              lng: processRouteDto.lng,
            },
          },
        },
      },
    });
  }
}
