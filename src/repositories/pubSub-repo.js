exports.publishMessage = async (pubSubClient, topicName, payload) => {
  const dataBuffer = Buffer.from(JSON.stringify(payload));

  const getTopics = await listAllTopics(pubSubClient);
  const isTopic = getTopics.filter((item) => item === topicName);

  if (isTopic.length !== 0) {
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
    return messageId;
  } else {
    console.log(`there is no topic with name: ${topicName}`);
    return undefined;
  }
};

exports.listenForPullMessages = async (
  pubSubClient,
  topicName,
  subscriptionName,
  subClient,
  projectId
) => {
  const getSubscriptions = await listAllSubscriptionsOnTopic(
    pubSubClient,
    topicName
  );
  const isSubscription = getSubscriptions.filter(
    (item) => item === subscriptionName
  );
  if (isSubscription.length === 0) {
    console.log("Resource not found");
    return undefined;
  }

  const subscription = pubSubClient.subscription(subscriptionName);
  const subscriptionPath = subClient.subscriptionPath(
    projectId,
    subscriptionName
  );
  console.log(`listening for message on ${subscriptionPath}`);
  const messageHandler = (message) => {
    const parsedMessage = JSON.parse(message.data);
    console.log(`Received message ${message.id}:`);
    const date = new Date();
    const getThisYear = date.getFullYear();
    if (subscriptionName === "YEAR_SUB") {
      birth =
        parsedMessage.service === "YEAR_SERVICE"
          ? parsedMessage.data
          : getThisYear - parsedMessage.data;
      console.log(`birth: ${birth}`);
    } else {
      age =
        parsedMessage.service === "AGE_SERVICE"
          ? parsedMessage.data
          : getThisYear - parsedMessage.data;
      console.log(`age: ${age}`);
    }
    message.ack();
  };

  subscription.on("message", messageHandler);
};

const listAllTopics = async (pubSubClient) => {
  const [topics] = await pubSubClient.getTopics();
  let getTopics = [];
  topics.forEach((topic) => getTopics.push(topic.name.slice(35)));
  return getTopics;
};

const listAllSubscriptionsOnTopic = async (pubSubClient, topicName) => {
  const [subscriptions] = await pubSubClient
    .topic(topicName)
    .getSubscriptions();
  let getSubscriptions = [];
  // subscriptions.forEach((subscription) => console.log(subscription.name));
  subscriptions.forEach((subscription) =>
    getSubscriptions.push(subscription.name.slice(42))
  );
  return getSubscriptions;
};
