const { redisClient } = require('../redis-server');
const axios = require('axios').default;

const getDataRedisOrApi = async (key, options) => {
	try {
		// 1. go to Redis and get data from cache
		let results = await redisClient.get(key);
		let foundTitles = JSON.parse(results);

		// 2. if not in redis, fetch from api and store in Redis
		if (foundTitles === null) {
			const resp = await axios.request(options);
			foundTitles = Object.values(resp.data)[0];

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
