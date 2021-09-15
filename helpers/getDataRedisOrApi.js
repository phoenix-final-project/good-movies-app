const { redisClient } = require('../redis-server');
const axios = require('axios').default;

const getDataRedisOrApi = async (key, options) => {
	try {
		// 1. go to Redis and get data from cache
		let result = await redisClient.get(key);
		let foundTitles;

		// 2. if not in redis, fetch from api and store in Redis
		if (result) {
			foundTitles = JSON.parse(result);
			console.log('REDIS');
		} else {
			result = await axios.request(options);
			foundTitles = Object.values(result.data)[0];
			console.log('API');

			// store in redis
			await redisClient.setex(key, 1800, JSON.stringify(foundTitles));
		}
		// console.log(foundTitles);
		return foundTitles;
	} catch (error) {
		return error.message;
	}
};

module.exports = getDataRedisOrApi;
