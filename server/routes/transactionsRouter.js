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
import { ObjectId } from 'mongodb';
import MdbCrud from '../db/mdbCrud.js';
const crud = new MdbCrud();
const { mdbDeleteOne, mdbFetchMany, mdbInsertOne, mdbUpdateOne } = crud;
const app = express();
app.use(express.json());
//routes
const transactionsRouter = express.Router();
transactionsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query || {};
    const { bearer } = query;
    if (bearer) {
        delete query.bearer;
        const payload = yield mdbFetchMany("transactions", query);
        res.json(payload);
    }
    else {
        res.json({ error: "no bearer" });
    }
}));
transactionsRouter.get('/:transactionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.params;
    const query = { _id: new ObjectId(transactionId) } || {};
    const payload = yield mdbFetchMany("transactions", query);
    res.json(payload);
}));
transactionsRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTransaction = req.body;
        console.log("inserting", newTransaction);
        yield mdbInsertOne("transactions", newTransaction);
        res.status(201).json(newTransaction);
    }
    catch (err) {
        res.status(500).json({ error: `Bad request. ${err}` });
    }
}));
transactionsRouter.put('/:transactionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req);
        // get unique id from req params
        const { transactionId } = req.params;
        const query = { _id: new ObjectId(transactionId) } || {};
        // get uri queries
        const routeQuery = req.query || {};
        const { bearer } = routeQuery;
        if (bearer) {
            // get request body payload
            const newTransaction = req.body;
            const payload = yield mdbUpdateOne("transactions", query, newTransaction);
            res.json(payload);
        }
        else {
            res.json({ error: "no bearer" });
        }
    }
    catch (err) {
        res.status(400).json({ error: `Bad request. ${err}` });
    }
}));
transactionsRouter.delete('/:transactionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req);
        // get unique id from req params
        const { transactionId } = req.params;
        const query = { _id: new ObjectId(transactionId) } || {};
        // get uri queries
        const routeQuery = req.query || {};
        const { bearer } = routeQuery;
        if (bearer) {
            const payload = yield mdbDeleteOne("transactions", query);
            res.json(payload);
        }
        else {
            res.json({ error: "no bearer" });
        }
    }
    catch (err) {
        res.status(400).json({ error: `Bad request. ${err}` });
    }
}));
export default transactionsRouter;
