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
class BlocksTableSchema extends Schema {
    up() {
        this.create('blocks', (table) => {
            // Metadata 
            table.increments('id');
            table.string('username', 256);
            table.string('process_hash', 4086);
            table.string('hash', 4086);
            table.string('prev_hash', 4086);
            table.string('param_hash', 4086);
            table.string('contents');
            table.string('signature');
            table.float('difficulty');
            table.float('threshold');
            table.integer('block_time');
            table.integer('block_size');
            table.float('performance'); 
            table.float('var_value'); 
            table.integer('position'); 
            table.integer('rejects');
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
module.exports = BlocksTableSchema
