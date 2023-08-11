// lambda.js
import express from 'express';
import serverless from 'serverless-http';
import transactionsRouter from './routes/transactionsRouter.js';
const app = express();
app.use(express.json());
app.use("/transactions", transactionsRouter);
app.get("/hello", (req, res) => {
    res.json({ message: "How Much Api Routes" });
});
//for testing
app.listen(5001, () => {
    console.log('server is listening at port 5001 testing');
});
export const handler = serverless(app);
