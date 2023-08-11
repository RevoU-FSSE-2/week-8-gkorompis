// lambda.js
import express from 'express';
import cors from 'cors'
import serverless from 'serverless-http';
import transactionsRouter from './routes/transactionsRouter.js'

const app = express();
app.use(cors())
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Replace with your frontend's URL
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', 'true'); // If using credentials

//   // Handle preflight requests
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

app.use(express.json());
app.use("/transactions", transactionsRouter)
app.get("/hello", (req, res)=>{
    res.json({message: "How Much Api Routes"});
});

//for testing
app.listen(5001, ()=>{
    console.log('server is listening at port 5001 testing')
})

export const handler = serverless(app);
