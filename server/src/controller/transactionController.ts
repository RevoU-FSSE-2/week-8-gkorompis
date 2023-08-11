
import {ObjectId} from 'mongodb';
import {Request, Response} from 'express';
import { TransactionRouteQuery, NewTransactionPayload, RequestBodyPayload } from '../types.js';
import MdbCrud from '../db/mdbCrud.js';
const crud = new MdbCrud();
const {mdbDeleteOne, mdbFetchMany, mdbInsertOne, mdbUpdateOne} = crud;

export const transactionGetController = async (req:Request, res:Response)=>{
    // get uri queries
    const query = req.query || {} as TransactionRouteQuery;
    const {bearer} = query;
    if(bearer){
        delete query.bearer;
        // get from database
        const payload = await mdbFetchMany("transactions", query);
        res.json(payload);
    } else {
        res.json({error: "no bearer"})
    }
}

export const transactionGetIdController =  async (req:Request, res:Response)=>{
    // get uri queries
    const requestQuery = req.query || {} as TransactionRouteQuery;
    const {bearer} = requestQuery;
    if(bearer){
        // get unique id from req params
        const {transactionId} = req.params;
        const query = {_id: new ObjectId(transactionId)} || {};
        // get from database
        const payload = await mdbFetchMany("transactions", query);
        res.json(payload);
    } else {
        res.json({error: "no bearer"})
    }
}

export const transactionPostController = async (req:Request, res:Response)=>{
    try {
         // get uri queries
        const requestQuery = req.query || {} as TransactionRouteQuery;
        const {bearer} = requestQuery;
        if(bearer){
            const requestBody:RequestBodyPayload = req.body;
            const transactionAmount = parseInt(requestBody["transactionAmount"]);
            const newTransaction:NewTransactionPayload = {
                ...requestBody, transactionAmount
            }
            console.log("inserting", newTransaction);
            // insert document to database
            await mdbInsertOne("transactions",newTransaction);
            res.status(201).json(newTransaction);
        } else {
            res.json({error: "no bearer"})
        }
        
    } catch (err){
        res.status(500).json({error: `Bad request. ${err}`})
    }
};

export const transactionPutController = async (req:Request, res:Response)=>{
    try {
        // get uri queries
        const routeQuery = req.query || {} as TransactionRouteQuery;
        const {bearer} = routeQuery;
        if(bearer){
            // get unique id from req params
            const {transactionId} = req.params;
            const query = {_id: new ObjectId(transactionId)} || {};
            
            // put document from database
            const newTransaction:NewTransactionPayload = req.body;
            const payload = await mdbUpdateOne("transactions", query, newTransaction);
            res.json(payload);
        } else {
            res.json({error: "no bearer"})
        }
    } catch (err){
        res.status(400).json({error: `Bad request. ${err}`})
    }
}
export const transactionPatchController = async (req:Request, res:Response)=>{
    try {
        // get uri queries
        const routeQuery = req.query || {} as TransactionRouteQuery;
        const {bearer} = routeQuery;

        if(bearer){
            // get unique id from req params
            const {transactionId} = req.params;
            const query = {_id: new ObjectId(transactionId)} || {};
        
            // patch document from database
            const newTransaction:NewTransactionPayload = req.body;
            const payload = await mdbUpdateOne("transactions", query, newTransaction);
            res.json(payload);
        } else {
            res.json({error: "no bearer"})
        }
    } catch (err){
        res.status(400).json({error: `Bad request. ${err}`})
    }
}

export const transactionDeleteController = async (req:Request, res:Response)=>{
    try {
        // get uri queries
        const routeQuery = req.query || {} as TransactionRouteQuery;
        const {bearer} = routeQuery;
        if(bearer){
            // get unique id from req params
            const {transactionId} = req.params;
            const query = {_id: new ObjectId(transactionId)} || {};

            // delete document from database
            const payload = await mdbDeleteOne("transactions", query);
            res.json(payload);
        } else {
            res.json({error: "no bearer"})
        }
    } catch (err){
        res.status(400).json({error: `Bad request. ${err}`})
    }
};
