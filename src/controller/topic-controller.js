const { PubSub } = require("@google-cloud/pubsub");

const pubSubClient = new PubSub();
const topicName = process.env.TOPIC_NAME;

const { publishMessage } = require("../repositories/pubSub-repo");

exports.create = async (req, res) => {
  try {
    const dataObj = req.body;
    let messageId = await publishMessage(pubSubClient, topicName, dataObj);
    if (messageId) {
      return res.status(200).send({
        status: "OK",
        message: `Message ${messageId} published :)`,
        code: 200,
      });
    } else {
      return res.status(404).send({
        status: "NOT FOUND",
        message: "Resource not found",
        code: 404,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "Internal Server Error",
      message: "Couldn't publish message :(",
      code: 500,
    });
  }
};
