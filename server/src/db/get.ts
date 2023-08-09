// import express from 'express';
// import { MongoClient, Db, Collection, InsertOneResult} from 'mongodb';


// Import the required modules
import { MongoClient, Db, Collection, FindCursor, WithId} from 'mongodb';
import '../loadenv.js'
// console.log(process.env.TEST_VAR);
const SECRET = process.env.MONGODB_SECRET;



// Define a function to connect to the MongoDB database
async function connectToMongoDB(): Promise<Db> {
const uri = SECRET || '' // Update with your MongoDB connection string
const client = new MongoClient(uri);

try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB successfully');

    // Get the database instance
    const database: Db = client.db('server-portal'); // Replace 'myDatabase' with your database name
    return database;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

// Define an interface for the data you want to store in the collection
type NewTransactionPayload = {
   transactionAmount: Number;
   transactionDate: String;
   transactionWallet: String;
   transactionPocket: String;
   transactionTag: String;
   transactionDetails: String;
}
// interface InsertResultWithOps<T> extends InsertOneResult<T> {
//   ops: T[];
// }

const mdbFetchMany = async (collection:string)=>{
  try {
    // Connect to MongoDB
    console.log(">>>connecting to mongodb")
    const db: Db = await connectToMongoDB();

    // Get the collection to work with
    console.log(`>>>connecting to ${collection} collection`)
    const newCollection: Collection<NewTransactionPayload> = await db.collection<NewTransactionPayload>(collection);

    console.log('>>>fetching collection:', collection );
    // console.log(usersCollection);
    const fetch = newCollection.find({});
    const documents = await fetch.toArray();
    // const cursor = newCollection.find({});

    
    console.log('>>>fetch success', documents);
    return documents;
  } catch (err) {
    console.error('Error:', err);
  }
};

export default mdbFetchMany;
