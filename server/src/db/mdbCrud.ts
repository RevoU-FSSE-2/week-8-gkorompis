import mdbDeleteOne from "./delete.js";
import mdbUpdateOne from "./put.js";
import mdbInsertOne from "./post.js";
import mdbFetchMany from "./get.js"; 
import {DeleteResult, UpdateResult, WithId} from "mongodb";

import { NewTransactionPayload, MultiFieldQuery, UniqueIdQuery } from "../types.js";
class MdbCrud {
    public mdbDeleteOne:(collection: string, query: UniqueIdQuery) => Promise<DeleteResult | undefined>;
    public mdbUpdateOne:(collection: string, query: UniqueIdQuery, updatePayload: NewTransactionPayload) => Promise<UpdateResult<NewTransactionPayload> | undefined>;
    public mdbInsertOne:(collection: string, payload: NewTransactionPayload) => Promise<void>;
    public mdbFetchMany:(collection: string, query: MultiFieldQuery) => Promise<WithId<MultiFieldQuery>[] | undefined>
    constructor(){
        this.mdbDeleteOne = mdbDeleteOne;
        this.mdbUpdateOne = mdbUpdateOne;
        this.mdbInsertOne = mdbInsertOne;
        this.mdbFetchMany = mdbFetchMany;
    }
}
export default MdbCrud;