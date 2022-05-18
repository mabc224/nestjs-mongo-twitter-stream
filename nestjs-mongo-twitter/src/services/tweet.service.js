import { Dependencies, Injectable, Logger } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { tweet } from '../schemas';

@Injectable()
@Dependencies(getModelToken(tweet.modelName))
export default class TwitterService {
  constructor(tweetModel) {
    this.TweetModel = tweetModel;

    this.logger = new Logger('twitter.service');
  }

  /** **********************************
   ********** functions **********
   *********************************** */

  async createTweet(data) {
    return this.TweetModel.create(data);
  }

  async listTweets(query = {}, skip = 0, limit = 10, sort = {}) {
    return this.TweetModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  async countTweets(query) {
    return this.TweetModel.countDocuments(query);
  }
}
