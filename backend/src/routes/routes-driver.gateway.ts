import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class RoutesDriverGateway {
  @SubscribeMessage('client:example')
  async handleMessageExample(client: any, payload: any) {
    console.log('Client', client);

    const response = `I received your message: ${payload}`;

    client.emit('server:example', response);
  }
}
