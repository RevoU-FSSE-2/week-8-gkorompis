// Import the required modules
import { MongoClient, Db, Collection, InsertOneResult} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.MONGODB_SECRET;

// Define a function to connect to the MongoDB database
async function connectToMongoDB(): Promise<Db> {
  const uri = SECRET || "";// Update with your MongoDB connection string
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
interface cashflowRecord {
  assetOwner: string;
  assetType: string;
  assetQuantity: number;
  assetDetails: string;
}
interface InsertResultWithOps<T> extends InsertOneResult<T> {
  ops: T[];
}

const mongodbPostOne = async ()=> {
  try {
    // Connect to MongoDB
    console.log(">>>connecting to mongodb")
    const db: Db = await connectToMongoDB();

    // Get the collection to work with
    console.log('>>>getting users collection')
    const usersCollection: Collection<cashflowRecord> = db.collection<cashflowRecord>('users');

    // mongondb operation insert one
    const newRecord: cashflowRecord = {
      assetOwner: "GK",
      assetType: "Cash Ins",
      assetQuantity: 1234510,
      assetDetails: "notes",
    };
    console.log(">>>inserting new record to databse");
    console.log(usersCollection);
    const post = await usersCollection.insertOne(newRecord) as InsertResultWithOps<cashflowRecord>;
    console.log('Inserted new user:', post);
  } catch (err) {
    console.error('Error:', err);
  }
};

// mongodbPostOne();

const createMdbCollection = async (collection_name:string) =>{
    try {
        //connecting to mongodb
        console.log(">>>connecting to mongodb")
        const db: Db = await connectToMongoDB();

         // create new Collection
        console.log(">>>creating collection", collection_name)
        const newCollection =  await db.createCollection(collection_name);
        console.log(">>>SUCCESS: new collection is made", newCollection);
        // const usersCollection: Collection<cashflowRecord> = db.collection<cashflowRecord>('users');
    } catch (err) {
        console.log("error:", err);
    }
};

createMdbCollection('transactions');
