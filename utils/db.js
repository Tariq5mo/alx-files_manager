import { MongoClient } from 'mongodb';

class DBHandler {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const name = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}`;

    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        this.db = false;
      } else {
        this.db = client.db(name);
      }
    });
  }

  isReady() {
    return !!this.db;
  }

  async userCount() {
    return this.db.collection('users').countDocuments();
  }

  async fileCount() {
    return this.db.collection('files').countDocuments();
  }
}

export default new DBHandler();
