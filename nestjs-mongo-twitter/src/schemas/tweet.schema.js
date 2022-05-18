import { Schema } from 'mongoose';

const tweetDefinition = {
  data: {
    type: String,
  },
  hashtags: {
    type: [String],
  },
  tweetLength: {
    type: Number,
  },
  username: {
    type: String,
  },
  tweetId: {
    type: String,
  },
  createdAt: Number,
};

const tweetSchema = new Schema(tweetDefinition);
tweetSchema.index({ data: 'text' });

const modelName = 'Tweet';

export {
  tweetSchema,
  tweetDefinition,
  modelName,
};
