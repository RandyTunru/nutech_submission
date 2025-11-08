import { Router } from "express";
import { validateToken } from "../middleware/validate-token";
import { getBalanceController, getTransactionHistoryController, postTopupController, postTransactionController } from "../controllers/transaction.controller";

const router = Router()

router.use(validateToken)

router.get('/balance', getBalanceController)
router.post('/topup', postTopupController)
router.post('/transactions', postTransactionController)
router.get('/transactions/history', getTransactionHistoryController)

export default router;