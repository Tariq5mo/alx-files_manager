#!/usr/bin/node
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    const rL = redisClient.isAlive();
    const dbL = dbClient.isAlive();
    res.status(200).json({ redis: rL, db: dbL });
  }

  static async getStats(req, res) {
    const totalUsers = await dbClient.nbUsers();
    const totalFiles = await dbClient.nbFiles();
    res.status(200).json({ users: totalUsers, files: totalFiles });
  }
}

module.exports = AppController;
