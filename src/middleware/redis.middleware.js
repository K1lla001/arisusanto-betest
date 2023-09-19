const redisMiddleware = require('redis');

const redisClient = redisMiddleware.createClient({
    host: process.env.REDIS_HOST || 'your_redis_host',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD ||'your_very_secret_redis_password'
});

redisClient.on('error', err => console.error("Redis Client Error", err));

const getFromCache = async (key) => {
    await redisClient.connect()
    try {
        return await redisClient.get(key)
    }catch (err){
        console.log("Error while get data", err)
        throw err
    }finally {
        await redisClient.quit()
    }
};

const setToCacheWithExpiry = async (key, data) => {
    await redisClient.connect()
    try {
        console.log("Save data to cache")
        return await redisClient.setEx(key, 3600, JSON.stringify(data))
    }catch (err){
        console.log(err)
        throw err
    }finally {
        await redisClient.quit()
    }
};

const removeFromCache = async (key) => {
    await redisClient.connect()
    try {
        console.log("Removing data")
        return await redisClient.del(key)
    }catch (err){
        console.log(err)
        throw err
    }finally {
        await redisClient.quit()
    }
};

const resetAllCache = async (key) => {

    try {
        for (let i = 0; i < key.length; i++) {
            await removeFromCache(key[i])
        }
    }catch (err){
        console.log(err)
        throw err
    }
}

module.exports = {
    getFromCache,
    setToCacheWithExpiry,
    removeFromCache,
    resetAllCache
};
