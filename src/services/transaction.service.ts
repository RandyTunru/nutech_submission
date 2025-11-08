import { email } from 'zod';
import pool from '../configs/database';
import { PostTopupBody, GetTransactionHistoryQuery, PostTransactionBody } from '../schemas/transaction.schema';
import { BadRequestException, UnprocessableEntityException } from '../exceptions';

export const getBalance = async (email: string) => {
    try {
        const query = `
            SELECT balance
            FROM users
            WHERE email = $1
        `;
        const result = await pool.query(query, [email]);
        return result.rows[0].balance;
    } catch (error) {
        console.error('Error getting balance:', error);
        throw error;
    }
};

export const postTopup = async (email: string, data: PostTopupBody) => {
    const client = await pool.connect();
    
    const { top_up_amount } = data;

    try {
        await client.query('BEGIN');

        const updateBalanceQuery = `
        UPDATE users
        SET balance = balance + $1
        WHERE email = $2
        RETURNING balance
        `;
        const result = await client.query(updateBalanceQuery, [top_up_amount, email]);

        const transactionQuery = `
        INSERT INTO transactions (transaction_type, description, total_amount, email)
        VALUES ('TOPUP', 'Top up balance', $1, $2)
        `;
        await client.query(transactionQuery, [top_up_amount, email]);

        await client.query('COMMIT');

        return result.rows[0].balance;

    } catch (error) {
        await client.query('ROLLBACK');
        
        console.error('Error posting top-up (transaction rolled back):', error);
        throw error; 

    } finally {
        client.release();
    }
};

export const postTransaction = async (email: string, data: PostTransactionBody) => {
        const client = await pool.connect();
        const { service_code } = data;
    try {
        await client.query('BEGIN');

        const getServiceQuery = `
            SELECT service_name, service_tariff
            FROM services
            WHERE service_code = $1
        `;
        const serviceResult = await client.query(getServiceQuery, [service_code]);

        if (serviceResult.rowCount === 0) {
            throw new BadRequestException('Kode layanan tidak valid.');
        }

        const updateBalanceQuery = `
            UPDATE users
            SET balance = balance - $1
            WHERE email = $2 AND balance >= $1
        `;
        const updateResult = await client.query(updateBalanceQuery, [serviceResult.rows[0].service_tariff, email]);

        if (updateResult.rowCount === 0) {
            throw new UnprocessableEntityException('Saldo tidak mencukupi untuk melakukan transaksi ini.');
        }

        const transactionQuery = `
            INSERT INTO transactions (transaction_type, description, total_amount, email)
            VALUES ('PAYMENT', $1, $2, $3)
            RETURNING invoice_number, transaction_type, description, total_amount, created_at
        `;
        const result = await client.query(transactionQuery, [serviceResult.rows[0].service_name, serviceResult.rows[0].service_tariff, email]);

        await client.query('COMMIT');

        return {
            "invoice_number": result.rows[0].invoice_number,
            "service_code": service_code,
            "service_name": serviceResult.rows[0].service_name,
            "transaction_type": result.rows[0].transaction_type,
            "total_amount": result.rows[0].total_amount,
            "created_on": result.rows[0].created_at
        }
    } catch (error) {
        console.error('Error posting transaction:', error);
        throw error;
    }
}

export const getTransactionHistory = async (email: string, query: GetTransactionHistoryQuery) => {
    try {
        const getTransactionHistoryQuery = `
            SELECT invoice_number, transaction_type, description, total_amount, created_at
            FROM transactions
            WHERE email = $1
            LIMIT $2 OFFSET $3
        `;
        const result = await pool.query(getTransactionHistoryQuery, [email, query.limit || 10, query.offset || 0]);
        return result.rows;
    } catch (error) {
        console.error('Error getting transaction history:', error);
        throw error;
    }
};
