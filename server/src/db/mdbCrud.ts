import mdbDeleteOne from "./delete.js";
import mdbUpdateOne from "./put.js";
import mdbInsertOne from "./post.js";
import mdbFetchMany from "./get.js"; 
import {DeleteResult, ObjectId, UpdateResult, WithId} from "mongodb";

type NewTransactionPayload = {
  _id?: ObjectId,
   transactionAmount?: number;
   transactionDate?: string;
   transactionWallet?: string;
   transactionPocket?: string;
   transactionTag?: string;
   transactionDetails?: string;
}
class MdbCrud {
    public mdbDeleteOne:(collection: string, query: NewTransactionPayload) => Promise<DeleteResult | undefined>;
    public mdbUpdateOne:(collection: string, query: NewTransactionPayload, updatePayload: NewTransactionPayload) => Promise<UpdateResult<NewTransactionPayload> | undefined>;
    public mdbInsertOne:(collection: string, payload: NewTransactionPayload) => Promise<void>;
    public mdbFetchMany:(collection: string, query: NewTransactionPayload) => Promise<WithId<NewTransactionPayload>[] | undefined>;
    constructor(){
        this.mdbDeleteOne = mdbDeleteOne;
        this.mdbUpdateOne = mdbUpdateOne;
        this.mdbInsertOne = mdbInsertOne;
        this.mdbFetchMany = mdbFetchMany;
    }
}
export default MdbCrud;