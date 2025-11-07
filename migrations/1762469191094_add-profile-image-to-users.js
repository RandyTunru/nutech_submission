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
  console.log('Adding "profile_image" column to "users" table...');
  pgm.sql(`
    ALTER TABLE users
    ADD COLUMN profile_image TEXT 
    DEFAULT 'https://blabla.com/default-profile.png'
    NOT NULL;
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  console.log('Dropping "profile_image" column from "users" table...');
  pgm.sql(`
    ALTER TABLE users
    DROP COLUMN profile_image;
  `);
};
