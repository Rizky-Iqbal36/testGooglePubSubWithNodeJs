require("dotenv").config();
const projectId = process.env.PROJECT_ID;
const topicName = process.env.TOPIC_NAME;
const subscriptionName = process.env.YEAR_SUB;

const { PubSub, v1 } = require("@google-cloud/pubsub");

const pubSubClient = new PubSub();
const subClient = new v1.SubscriberClient();

const { listenForPullMessages } = require("../../repositories/pubSub-repo");

listenForPullMessages(
  pubSubClient,
  topicName,
  subscriptionName,
  subClient,
  projectId
);
