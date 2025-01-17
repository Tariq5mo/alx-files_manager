const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    try {
      const redisAlive = redisClient.isAlive();
      const dbAlive = dbClient.isAlive();
      return res.status(200).json({ redis: redisAlive, db: dbAlive });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }

  static async getStats(req, res) {
    const usersTotal = await dbClient.nbUsers();
    const filesTotal = await dbClient.nbFiles();
    res.status(200).json({ users: usersTotal, files: filesTotal });
  }
}

module.exports = AppController;