'use strict'
/** @desc Blocks Migration: creates the Blocks collection. */
const Schema = use('Schema')
/** 
 * @desc Blocks table stores the blochains for all the processes
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class AccountingTableSchema extends Schema {
    up() {
        this.create('blocks', (table) => {
            // Metadata 
            table.increments('id');
            table.string('username', 256);
            table.integer('process_hash');
            table.integer('prev_block_hash');
            table.integer('block_contents');
            table.string('signature');
            table.string('difficulty');
            table.string('threshold');
            table.integer('block_time');
            table.integer('block_size');
            table.string('created_by', 4086);
            table.string('updated_by', 4086);
            table.string('created_at', 4086);
            table.string('updated_at', 4086);
        })
    }
    down() {
        this.drop('blocks')
    }
}
module.exports = AccountingTableSchema
