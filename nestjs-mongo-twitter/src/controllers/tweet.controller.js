import {
  Controller, Dependencies, Bind, Get, Post, Delete,
  Query, Param, HttpCode, HttpException, HttpStatus, Logger,
} from '@nestjs/common';
import { TweetService, TwitterStreamService } from '../services';

@Controller({
  path: 'tweets',
  version: ['0.1'],
})

@Dependencies(TweetService, TwitterStreamService)
export default class TweetController {
  constructor(tweetService, twitterStreamService) {
    this.tweetService = tweetService;
    this.tweetStreamService = twitterStreamService;

    this.logger = new Logger('tweet.controller');
  }

  @Get('/')
  @Bind(Query())
  async listTweets(queryParams) {
    const {
      sortBy = 'createdAt',
      order = 'desc',
      search = '',
    } = queryParams;
    let { page, perPage } = queryParams;

    page = page ? parseInt(page, 10) : 1;
    perPage = perPage ? parseInt(perPage, 10) : 10;

    const ordering = order === 'asc' ? 1 : -1;

    const query = {};
    if (search) {
      query.$text = { $search: search };
    }
    // else {
    //   query['hashtags.0'] = { $exists: true };
    // }
    const skip = perPage * (page - 1);
    const limit = perPage;
    const sort = { [sortBy]: ordering };

    const [totalCount, tweets] = await Promise.all([
      this.tweetService.countTweets(query),
      this.tweetService.listTweets(query, skip, limit, sort),
    ]);

    const totalPages = parseInt(Math.ceil(totalCount / perPage), 10);
    if (totalCount <= perPage) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    return {
      tweets: tweets.map((tweet) => this.getApiTweet(tweet)),
      page,
      perPage,
      totalCount,
    };
  }

  @Post('/:topic')
  @Bind(Param())
  @HttpCode(204)
  createTopic(params) {
    const { topic } = params;

    this.tweetStreamService.trackTopic(this.topicFromApi(topic));
  }

  @Delete('/:topic')
  @Bind(Param())
  @HttpCode(204)
  deleteRestaurant(params) {
    const { topic } = params;

    this.tweetStreamService.unTrackTopic(this.topicFromApi(topic));
  }

  /** **********************************
   ********** UTILS functions **********
   *********************************** */

  topicFromApi(topic) {
    const trimmed = (topic || '').trim();
    if (!trimmed.length) {
      throw new HttpException('Invalid value for `topic`', HttpStatus.BAD_REQUEST);
    }
    return trimmed;
  }

  getApiTweet(tweet) {
    const {
      _id,
      hashtags,
      data,
      tweetLength,
      tweetId,
      createdAt,
    } = tweet;

    return {
      _id,
      hashtags,
      data,
      tweetLength,
      tweetId,
      createdAt: new Date(createdAt),
    };
  }
}
