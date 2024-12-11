import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapsModule } from './maps/maps.module';
import { ConfigModule } from '@nestjs/config';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MapsModule, RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
