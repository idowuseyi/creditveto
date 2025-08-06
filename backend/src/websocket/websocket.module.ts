import { Module } from '@nestjs/common';
import { DisputeGateway } from './websocket.gateway';

@Module({
  providers: [DisputeGateway],
  exports: [DisputeGateway],
})
export class WebsocketModule { }
