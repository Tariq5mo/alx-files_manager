import { MongoClient } from 'mongodb';

class DataClient {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';
    const connectionString = `mongodb://${dbHost}:${dbPort}`;

    MongoClient.connect(connectionString, { useUnifiedTopology: true }, (connectionError, clientInstance) => {
      if (connectionError) {
        this.databaseClient = false;
      } else {
        this.databaseClient = clientInstance.db(dbName);
      }
    });
  }

  isOperational() {
    return !!this.databaseClient;
  }

  async countUsers() {
    return this.databaseClient.collection('users').countDocuments();
  }

  async countFiles() {
    return this.databaseClient.collection('files').countDocuments();
  }
}

export default new DataClient();
