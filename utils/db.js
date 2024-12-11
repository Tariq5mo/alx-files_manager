#!/usr/bin/node
import { MongoClient } from 'mongodb';

class DatabaseClient {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';
    const connectionString = `mongodb://${dbHost}:${dbPort}`;

    MongoClient.connect(connectionString, { useUnifiedTopology: true }, (error, client) => {
      if (error) {
        this.database = null;
      } else {
        this.database = client.db(dbName);
      }
    });
  }

  isConnected() {
    return !!this.database;
  }

  async countUsers() {
    return this.database.collection('users').countDocuments();
  }

  async countFiles() {
    return this.database.collection('files').countDocuments();
  }
}

export default new DatabaseClient();

