import { Request, Response } from "express";
import { getBalance, postTopup, postTransaction, getTransactionHistory } from "../services/transaction.service";
import { HttpException } from "../exceptions";

export const getBalanceController = async ( req: Request, res: Response ) => {
    try{
        const email = req.user!.email
        const balance = await getBalance(email)
        res.status(200).json({
            status: 0,
            message: "Get Balance Berhasil",
            data:{
                balance
            }
        })
    } catch (error){
        console.error("Unexpected error: ", error)
        res.status(500).json({
            status: 1,
            message: "Gagal mengambil balance",
            data: null
        })
    }
}

export const postTopupController = async ( req: Request, res: Response ) => {
    try{
        const email = req.user!.email
        const newBalance = await postTopup(email, req.body)
        res.status(200).json({
            status: 0,
            message: "Top-up berhasil",
            data: {
                balance: newBalance
            }
        })
    } catch (error){
        console.error("Unexpected error: ", error)
        res.status(500).json({
            status: 1,
            message: "Gagal melakukan top-up",
            data: null
        })
    }
}

export const postTransactionController = async ( req: Request, res: Response ) => {
    try{
        const email = req.user!.email
        const result = await postTransaction(email, req.body)
        res.status(200).json({
            status: 0,
            message: "Transaksi berhasil",
            data: result
        })
    } catch (error){
        if (error instanceof HttpException){
            return res.status(error.httpStatusCode).json({
                status: error.applicationStatusCode,
                message: error.message,
                data: null
            })
        }
        console.error("Unexpected error: ", error)
        res.status(500).json({
            status: 1,
            message: "Gagal melakukan transaksi",
            data: null
        })
    }
}

export const getTransactionHistoryController = async ( req: Request, res: Response ) => {
    try{
        const email = req.user!.email
        const history = await getTransactionHistory(email, req.query)
        res.status(200).json({
            status: 0,
            message: "Get Transaction History Berhasil",
            data: {
                offset : req.query.offset || 0,
                limit : req.query.limit || 10,
                records: history
            }
        })
    } catch (error){
        console.error("Unexpected error: ", error)
        res.status(500).json({
            status: 1,
            message: "Gagal mengambil transaction history",
            data: null
        })
    }
}
