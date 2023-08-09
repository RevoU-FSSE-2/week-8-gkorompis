var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import mdbInsertOne from '../db/fetch.js';
const app = express();
app.use(express.json());
//routes
const transactionsRouter = express.Router();
transactionsRouter.get('/', (req, res) => {
    res.json("GET Transactions route new alias");
});
transactionsRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTransaction = req.body;
        console.log("inserting", newTransaction);
        yield mdbInsertOne("transactions", newTransaction);
        res.status(201).json(newTransaction);
    }
    catch (err) {
        res.status(400).json({ error: `Bad request. ${err}` });
    }
}));
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
