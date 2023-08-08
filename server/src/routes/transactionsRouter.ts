import express from 'express';

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

transactionsRouter.get('/', (req, res)=>{
    res.json("GET Transactions route new alias")
});
transactionsRouter.post('/', (req, res)=>{
    try {
        const newTransaction:NewTransactionPayload = req.body;
        // const newTransaction = body;
        res.status(201).json(newTransaction);
    } catch (err){
        res.status(400).json({error: `Bad request. ${err}`})
    }
});

export default transactionsRouter;

