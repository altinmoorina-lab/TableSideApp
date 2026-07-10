import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

type CachedConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseConnection?: CachedConnection;
};

globalWithMongoose.mongooseConnection ??= { conn: null, promise: null };

export async function connectToDatabase() {
  if (!uri) {
    return null;
  }

  if (globalWithMongoose.mongooseConnection!.conn) {
    return globalWithMongoose.mongooseConnection!.conn;
  }

  globalWithMongoose.mongooseConnection!.promise ??= mongoose.connect(uri, {
    bufferCommands: false,
  });

  globalWithMongoose.mongooseConnection!.conn = await globalWithMongoose.mongooseConnection!.promise;
  return globalWithMongoose.mongooseConnection!.conn;
}
