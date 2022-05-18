import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middlewares';
import { DatabaseModule } from './modules';
import { TweetController } from './controllers';
import { TweetService, TwitterStreamService, SocketService } from './services';
import { tweet } from './schemas';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: tweet.modelName, schema: tweet.schema },
    ]),
  ],
  controllers: [
    TweetController,
  ],
  providers: [
    Logger,
    TweetService,
    TwitterStreamService,
    SocketService,
  ],
})
export default class GatewayModule {
  configure(consumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
