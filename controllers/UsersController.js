import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import { userQueue } from '../worker';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: `Missing ${!email ? 'email' : 'password'}` });
    }

    const userExists = await dbClient.dbClient.collection('users').findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = sha1(password);
    const newUser = { email, password: hashedPassword };

    const result = await dbClient.dbClient.collection('users').insertOne(newUser);
    userQueue.add({ userId: result.insertedId });

    return res.status(201).json({ id: result.insertedId, email });
  }

  static async getMe(req, res) {
    const token = req.header('X-Token');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await dbClient.dbClient.collection('users').findOne({ _id: new ObjectId(userId) });
    if (user) {
      return res.status(200).json({ id: userId, email: user.email });
    }

    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export default UsersController;
