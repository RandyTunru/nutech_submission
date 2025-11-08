/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.sql(`
        CREATE TYPE transaction_type AS ENUM ('TOPUP', 'PAYMENT');

        CREATE TABLE transactions (
            invoice_number uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            transaction_type transaction_type NOT NULL,
            description TEXT NOT NULL,
            total_amount BIGINT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            email VARCHAR(100) REFERENCES users(email) ON DELETE SET NULL
        );

        CREATE INDEX idx_transactions_email ON transactions(email);
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE IF EXISTS transactions;
        DROP TYPE IF EXISTS transaction_type;
        DROP INDEX IF EXISTS idx_transactions_email;
    `);
};
