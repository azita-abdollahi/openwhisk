const { createClient } = require('redis');
const { config } = require('dotenv');
config();

const redisUrl = `redis://:${process.env.redis_pass}@192.168.67.128:6379`;
const redisClient = createClient({
    url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected...');
  } catch (err) {
    console.log(err.message);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

redisClient.on('error', (err) => console.log(err));

module.exports = connectRedis;
