import express from 'express';
const app = express();
app.use(express.json());
//routes
const transactionsRouter = express.Router();
transactionsRouter.get('/', (req, res) => {
    res.json("GET Transactions route new alias");
});
transactionsRouter.post('/', (req, res) => {
    try {
        const newTransaction = req.body;
        res.status(201).json(newTransaction);
    }
    catch (err) {
        res.status(400).json({ error: `Bad request. ${err}` });
    }
});
transactionsRouter.put('/:transactionId', (req, res) => {
    try {
        // console.log(req);
        // const params = req.params;
        const { transactionId } = req.params;
        const newTransaction = req.body;
        res.status(201).json({ transactionId, newTransaction, message: `updating ${transactionId} for ${newTransaction.transactionAmount}` });
    }
    catch (err) {
        res.status(400).json({ error: `Bad request. ${err}` });
    }
});
transactionsRouter.delete('/:transactionId', (req, res) => {
    try {
        // console.log(req);
        // const params = req.params;
        const { transactionId } = req.params;
        const newTransaction = req.body;
        res.status(201).json({ transactionId, newTransaction, message: `deleting ${transactionId} for ${newTransaction.transactionAmount}` });
    }
    catch (err) {
        res.status(400).json({ error: `Bad request. ${err}` });
    }
});
export default transactionsRouter;
