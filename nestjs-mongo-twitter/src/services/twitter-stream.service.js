import { Dependencies, Injectable, Logger } from '@nestjs/common';
import Twitter from 'node-tweet-stream';
import TweetService from './tweet.service';
import SocketService from './socket.service';

const {
  CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET,
} = process.env;

const twitter = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  token: ACCESS_TOKEN,
  token_secret: ACCESS_SECRET,
});

@Injectable()
@Dependencies(TweetService, SocketService)
export default class TweetStreamService {
  constructor(tweetService, socketService) {
    this.tweetService = tweetService;
    this.socketService = socketService;

    twitter.on('tweet', async (tweet) => {
      // eslint-disable-next-line no-console
      // console.log('tweet received', JSON.stringify(tweet));
      const {
        // eslint-disable-next-line camelcase
        id_str: tweetId, text: data, timestamp_ms: createdAt, user: { screen_name: username },
        extended_tweet: { entities: { hashtags = [] } = {} } = {},
      } = tweet;

      const createData = {
        hashtags: hashtags && hashtags.length ? hashtags.map(({ text }) => text) : [],
        data,
        tweetLength: data.length,
        tweetId,
        username,
        createdAt,
      };

      await this.tweetService.createTweet(createData);
      this.socketService.emitNewTweet(createData);
    });
    twitter.track('bitcoin');

    this.logger = new Logger('twitter-stream.service');
  }

  /** **********************************
   ********** functions **********
   *********************************** */

  async trackTopic(topic) {
    twitter.untrack(topic);
  }

  async unTrackTopic(topic) {
    twitter.untrack(topic);
  }
}
