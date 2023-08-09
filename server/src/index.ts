// lambda.js
import express from 'express';
import serverless from 'serverless-http';
import transactionsRouter from './routes/transactionsRouter.js'

const app = express();

app.use(express.json());
app.use("/transactions", transactionsRouter)
app.get("/hello", (req, res)=>{
    res.send("hello world! new alias");
});

//for testing
app.listen(5001, ()=>{
    console.log('server is listening at port 5001 test2')
})

export const handler = serverless(app);
