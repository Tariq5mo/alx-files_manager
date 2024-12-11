import redis from 'redis';

class CacheHandler {
  constructor() {
    this.connection = redis.createClient();
    this.connection.on('error', (err) => {
      console.error(err);
    });
  }

  isOperational() {
    return this.connection.connected;
  }

  async fetch(keyName) {
    return new Promise((resolve, reject) => {
      this.connection.get(keyName, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async store(keyName, valueData, ttl) {
    return new Promise((resolve, reject) => {
      this.connection.setex(keyName, ttl, valueData, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async remove(keyName) {
    return new Promise((resolve, _reject) => {
      this.connection.del(keyName, (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}

const cacheHandler = new CacheHandler();
export default cacheHandler;
