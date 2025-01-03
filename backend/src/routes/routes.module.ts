import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { MapsModule } from 'src/maps/maps.module';
import { RoutesDriverService } from './routes-driver.service';
import { RoutesDriverGateway } from './routes-driver.gateway';

@Module({
  imports: [PrismaModule, MapsModule],
  controllers: [RoutesController],
  providers: [
    PrismaService,
    RoutesService,
    RoutesDriverService,
    RoutesDriverGateway,
  ],
})
export class RoutesModule {}
