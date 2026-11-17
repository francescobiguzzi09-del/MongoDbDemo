import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://francescobiguzzistud_db_user:JSF8uXvAesIRYati@cluster0.pirw59k.mongodb.net/");

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}

