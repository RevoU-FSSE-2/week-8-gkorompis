import express from 'express';
import {
    transactionGetController,
    transactionGetIdController,
    transactionPostController,
    transactionPutController,
    transactionPatchController,
    transactionDeleteController
} from '../controller/transactionController.js'

const app = express();
app.use(express.json());
const transactionsRouter = express.Router();

//routes
transactionsRouter.get('/', transactionGetController);
transactionsRouter.get('/:transactionId', transactionGetIdController);
transactionsRouter.post('/', transactionPostController);
transactionsRouter.put('/:transactionId', transactionPutController);
transactionsRouter.patch('/:transactionId', transactionPatchController);
transactionsRouter.delete('/:transactionId', transactionDeleteController);

export default transactionsRouter;

