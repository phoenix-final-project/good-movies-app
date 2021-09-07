// const redis = require('redis');
// const { promisify } = require('util');

// const redisClient = redis.createClient();
// const getCacheAsync = promisify(redisClient.get).bind(redisClient);

// module.exports = { redisClient, getCacheAsync };

const asyncRedis = require('async-redis');

const redisClient = asyncRedis.createClient({ host: process.env.UPSTASH_URL, port: process.env.UPSTASH_PORT, password: process.env.UPSTASH_PASSWORD });

module.exports = { redisClient };
