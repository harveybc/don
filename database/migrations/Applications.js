'use strict'
/** @desc Applications Migration: creates the applications collection. */
const Schema = use('Schema')
/** 
 * @desc Applications table stores the applications registers that
 * each register has an username, collection, method, date, applications,
 * result (string) and block id(hash)of the block it belongs.
 * The block can be null if belongs to the current(on construction) block.
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class ApplicationsTableSchema extends Schema {
    up() {
        this.create('applications', (table) => {
            // Metadata 
            table.increments('id');
            table.string('name', 4086); 
            table.string('hash', 4086); 
            table.string('created_by', 4086);
            table.string('updated_by', 4086);
            table.string('created_at', 4086);
            table.string('updated_at', 4086);

        })
    }
    down() {
        this.drop('models')
    }
}

module.exports = ApplicationsTableSchema
