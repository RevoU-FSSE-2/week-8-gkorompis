import express from 'express';

const app = express();
app.use(express.json());

const transactionsRouter = express.Router();

transactionsRouter.get('/', (req, res)=>{
    res.json("GET Transactions route")
});
transactionsRouter.post('/', (req, res)=>{
    const newTransaction = {
        transaction: "foo"
    };
    res.status(201).json(newTransaction)
});

export default transactionsRouter;

