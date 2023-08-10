import express from 'express';
import {ObjectId} from 'mongodb';
import MdbCrud from '../db/mdbCrud.js';

const crud = new MdbCrud();
const {mdbDeleteOne, mdbFetchMany, mdbInsertOne, mdbUpdateOne} = crud;

const app = express();
app.use(express.json());

// interfaces
type NewTransactionPayload = {
   transactionAmount: number;
   transactionDate: string;
   transactionWallet: string;
   transactionPocket: string;
   transactionTag: string;
   transactionDetails: string;
}

interface TransactionQuery {
    _id?: ObjectId;
    transactionAmount?: number;
    transactionDate?: string;
    transactionWallet?: string;
    transactionPocket?: string;
    transactionTag?: string;
    transactionDetails?: string;
    bearer?: string;
}

//routes
const transactionsRouter = express.Router();

transactionsRouter.get('/', async (req, res)=>{
    const query = req.query || {} as TransactionQuery;
    const {bearer} = query;
    if(bearer){
        delete query.bearer;
        const payload = await mdbFetchMany("transactions", query);
        res.json(payload);
    } else {
        res.json({error: "no bearer"})
    }
});
transactionsRouter.get('/:transactionId', async (req, res)=>{
    const {transactionId} = req.params;
    const query = {_id: new ObjectId(transactionId)} || {};
    const payload = await mdbFetchMany("transactions",query);
    res.json(payload);
});
transactionsRouter.post('/', async (req, res)=>{
    try {
        const newTransaction:NewTransactionPayload = req.body;
        console.log("inserting", newTransaction);
        await mdbInsertOne("transactions",newTransaction);
        res.status(201).json(newTransaction);
    } catch (err){
        res.status(500).json({error: `Bad request. ${err}`})
    }
});
transactionsRouter.put('/:transactionId', async (req, res)=>{
    try {
        // console.log(req);
        // get unique id from req params
        const {transactionId} = req.params;
        const query = {_id: new ObjectId(transactionId)} || {};
        
        // get uri queries
        const routeQuery = req.query || {} as TransactionQuery;
        const {bearer} = routeQuery;

        if(bearer){
            // get request body payload
            const newTransaction:NewTransactionPayload = req.body;
            const payload = await mdbUpdateOne("transactions", query, newTransaction);
            res.json(payload);
        } else {
            res.json({error: "no bearer"})
        }
    } catch (err){
        res.status(400).json({error: `Bad request. ${err}`})
    }
});
transactionsRouter.delete('/:transactionId', async (req, res)=>{
    try {
        // console.log(req);
        // get unique id from req params
        const {transactionId} = req.params;
        const query = {_id: new ObjectId(transactionId)} || {};
        
        // get uri queries
        const routeQuery = req.query || {} as TransactionQuery;
        const {bearer} = routeQuery;

        if(bearer){
            const payload = await mdbDeleteOne("transactions", query);
            res.json(payload);
        } else {
            res.json({error: "no bearer"})
        }
    } catch (err){
        res.status(400).json({error: `Bad request. ${err}`})
    }
});

export default transactionsRouter;

