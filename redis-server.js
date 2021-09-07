const asyncRedis = require('async-redis');

const redisClient = asyncRedis.createClient({ host: process.env.UPSTASH_URL, port: process.env.UPSTASH_PORT, password: process.env.UPSTASH_PASSWORD });

module.exports = { redisClient };
