import { Bind, Injectable, Logger } from '@nestjs/common';
import {
  SubscribeMessage, WebSocketGateway, MessageBody,
} from '@nestjs/websockets';

@Injectable()
@WebSocketGateway({ cors: true })
export default class SocketService {
  constructor() {
    this.logger = new Logger('SocketGateway');
  }

  @SubscribeMessage('new-tweet')
  @Bind(MessageBody())
  emitNewTweet(data) {
    const result = {
      _id: data.tweetId,
      value: data.tweetLength,
      displayText: data.tweetLength,
      colorValue: data.tweetLength, // used to determine color
      selected: false,
      text: data.data,
    };
    this.server.emit('new-tweet', result);
  }

  afterInit(server) {
    this.logger.log('Init Socket');
    this.server = server;
  }

  handleDisconnect(client) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
