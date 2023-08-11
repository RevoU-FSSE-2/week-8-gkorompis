import {ObjectId} from 'mongodb';

export type RequestBodyPayload = {
    userId: string;
    transactionAmount: string;
    transactionDate: string;
    transactionWallet: string;
    transactionPocket: string;
    transactionTag: string;
    transactionDetails: string;
}

export type NewTransactionPayload = {
    userId: string;
    transactionAmount: number;
    transactionDate: string;
    transactionWallet: string;
    transactionPocket: string;
    transactionTag: string;
    transactionDetails: string;
}

export interface TransactionRouteQuery {
    _id?: ObjectId;
    userId?: string;
    transactionAmount?: number;
    transactionDate?: string;
    transactionWallet?: string;
    transactionPocket?: string;
    transactionTag?: string;
    transactionDetails?: string;
    bearer?: string;
}

export type UniqueIdQuery = {
    _id: ObjectId
}

export type MultiFieldQuery = {
    _id?: ObjectId;
    userId?: string;
    transactionAmount?: number;
    transactionDate?: string;
    transactionWallet?: string;
    transactionPocket?: string;
    transactionTag?: string;
    transactionDetails?: string;
}