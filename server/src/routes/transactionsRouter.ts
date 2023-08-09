import express from 'express';
import mdbInsertOne from '../db/post.js';
import mdbFetchMany from '../db/get.js';

const app = express();
app.use(express.json());

// interfaces
type NewTransactionPayload = {
   transactionAmount: Number;
   transactionDate: String;
   transactionWallet: String;
   transactionPocket: String;
   transactionTag: String;
   transactionDetails: String;
}

//routes
const transactionsRouter = express.Router();

transactionsRouter.get('/', async (req, res)=>{
    const payload = await mdbFetchMany("transactions");
    res.json(payload);
});
transactionsRouter.post('/', async (req, res)=>{
    try {
        const newTransaction:NewTransactionPayload = req.body;
        console.log("inserting", newTransaction);
        await mdbInsertOne("transactions",newTransaction);
        res.status(201).json(newTransaction);
    } catch (err){
        res.status(400).json({error: `Bad request. ${err}`})
    }
});
transactionsRouter.put('/:transactionId', (req, res)=>{
    try {
        // console.log(req);
        // const params = req.params;
        const {transactionId} = req.params;
        const newTransaction:NewTransactionPayload = req.body;
        res.status(201).json({transactionId, newTransaction, message: `updating ${transactionId} for ${newTransaction.transactionAmount}`});
    } catch (err){
        res.status(400).json({error: `Bad request. ${err}`})
    }
});
transactionsRouter.delete('/:transactionId', (req, res)=>{
    try {
        // console.log(req);
        // const params = req.params;
        const {transactionId} = req.params;
        const newTransaction:NewTransactionPayload = req.body;
        res.status(201).json({transactionId, newTransaction, message: `deleting ${transactionId} for ${newTransaction.transactionAmount}`});
    } catch (err){
        res.status(400).json({error: `Bad request. ${err}`})
    }
});

export default transactionsRouter;

