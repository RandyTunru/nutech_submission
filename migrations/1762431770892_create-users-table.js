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
    console.log('Creating users table...');
    pgm.sql(`
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE INDEX idx_users_email ON users(email);
    `);
    console.log('Users table created.');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    console.log('Dropping users table...');
    pgm.sql(`
        DROP EXTENSION IF EXISTS "pgcrypto";
        DROP INDEX IF EXISTS idx_users_email;
        DROP TABLE IF EXISTS users;
    `);
    console.log('Users table dropped.');
};
