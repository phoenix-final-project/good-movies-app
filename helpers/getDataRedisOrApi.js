const { redisClient } = require('../redis-server');
const axios = require('axios').default;

const getDataRedisOrApi = async (key, options) => {
	try {
		let foundData;

		// 1. go to Redis and get data from cache
		let result = await redisClient.get(key);

		// 2. if in redis, give results, in not - fetch from api and store in Redis
		if (result) {
			foundData = JSON.parse(result);
			console.log('REDIS');
		} else {
			result = await axios.request(options);
			foundData = Object.values(result.data)[0];
			console.log('API');

			// store in redis
			await redisClient.setex(key, 1800, JSON.stringify(foundData));
		}
		// console.log(foundData);
		return foundData;
	} catch (error) {
		return error.message;
	}
};

module.exports = getDataRedisOrApi;
