// lambda.js
import express from 'express';
import serverless from 'serverless-http';
import transactionsRouter from './routes/transactionsRouter.js'

const app = express();

app.use(express.json());
app.use("/transactions", transactionsRouter)
app.get("/hello", (req, res)=>{
    res.send("hello world!");
});

export const handler = serverless(app);
