var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectId } from 'mongodb';
import MdbCrud from '../db/mdbCrud.js';
import "../loadenv.js";
const crud = new MdbCrud();
const { mdbDeleteOne, mdbFetchMany, mdbInsertOne, mdbUpdateOne } = crud;
const token = process.env.API_SECRET;
export const transactionGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get uri queries
    const query = req.query || {};
    const { bearer } = query;
    if (bearer == token) {
        delete query.bearer;
        // get from database
        const payload = yield mdbFetchMany("transactions", query);
        res.json(payload);
    }
    else {
        res.status(401).json({ error: "unauthorized token" });
    }
    ;
});
export const transactionGetIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get uri queries
    const requestQuery = req.query || {};
    const { bearer } = requestQuery;
    if (bearer == token) {
        // get unique id from req params
        const { transactionId } = req.params;
        const query = { _id: new ObjectId(transactionId) } || {};
        // get from database
        const payload = yield mdbFetchMany("transactions", query);
        res.json(payload);
    }
    else {
        res.json({ error: "no bearer" });
    }
});
export const transactionPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get uri queries
        const requestQuery = req.query || {};
        const { bearer } = requestQuery;
        if (bearer == token) {
            const requestBody = req.body;
            const transactionAmount = parseInt(requestBody["transactionAmount"]);
            const newTransaction = Object.assign(Object.assign({}, requestBody), { transactionAmount });
            console.log("inserting", newTransaction);
            // insert document to database
            yield mdbInsertOne("transactions", newTransaction);
            res.status(201).json(newTransaction);
        }
        else {
            res.json({ error: "no bearer" });
        }
    }
    catch (err) {
        res.status(500).json({ error: `Bad request. ${err}` });
    }
});
export const transactionPutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get uri queries
        const routeQuery = req.query || {};
        const { bearer } = routeQuery;
        if (bearer == token) {
            // get unique id from req params
            const { transactionId } = req.params;
            const query = { _id: new ObjectId(transactionId) } || {};
            // put document from database
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
});
export const transactionPatchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get uri queries
        const routeQuery = req.query || {};
        const { bearer } = routeQuery;
        if (bearer == token) {
            // get unique id from req params
            const { transactionId } = req.params;
            const query = { _id: new ObjectId(transactionId) } || {};
            // patch document from database
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
});
export const transactionDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get uri queries
        const routeQuery = req.query || {};
        const { bearer } = routeQuery;
        if (bearer == token) {
            // get unique id from req params
            const { transactionId } = req.params;
            const query = { _id: new ObjectId(transactionId) } || {};
            // delete document from database
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
});
