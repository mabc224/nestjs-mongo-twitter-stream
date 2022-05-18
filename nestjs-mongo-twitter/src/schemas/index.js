import { tweetSchema, tweetDefinition, modelName as tweetModelName } from './tweet.schema';

const tweet = {
  modelName: tweetModelName,
  definition: tweetDefinition,
  schema: tweetSchema,
};

export {
  tweet,
};

export default {};
