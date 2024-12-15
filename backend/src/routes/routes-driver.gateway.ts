import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { RoutesService } from './routes.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoutesDriverGateway {
  constructor(private routesService: RoutesService) {}

  @SubscribeMessage('client:new-points')
  async handleMessage(client: any, payload: any) {
    const { routeId } = payload;

    console.log('routeId', routeId);

    const route = await this.routesService.findOne(routeId);

    // @ts-expect-error - routes has not been defined
    const { steps } = route.directions.routes[0].legs[0];

    for (const step of steps) {
      const { lat, lng } = step.start_location;

      client.emit(`server:new-points/${routeId}:list`, {
        routeId,
        lat,
        lng,
      });

      client.broadcast.emit('server:new-points:list', {
        routeId,
        lat,
        lng,
      });

      await sleep(2000);

      const { lat: lat2, lng: lng2 } = step.end_location;

      client.emit(`server:new-points/${routeId}:list`, {
        routeId,
        lat: lat2,
        lng: lng2,
      });

      client.broadcast.emit('server:new-points:list', {
        routeId,
        lat,
        lng,
      });

      await sleep(2000);
    }
  }
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
