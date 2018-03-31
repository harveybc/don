'use strict'
/** @desc Neighbors Migration: creates the neighbors collection. */ 
const Schema = use('Schema')
/** 
 * @desc Neighbors table stores the neighbors registers that
 * each register has an username, collection, method, date, neighbors,
 * result (string) and block id(hash)of the block it belongs.
 * The block can be null if belongs to the current(on construction) block.
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class NeighborsTableSchema extends Schema {
    up() {
        this.create('neighbors', (table) => {
            // Metadata 
            table.increments('id');
            table.string('app_hash', 4086); 
            table.string('address', 4086); 
            table.integer('distance'); // in hops
            table.integer('latency');  // in ms
            table.integer('selection_method');  // 0=random, 1=lowest distance, 2= lowest
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

module.exports = NeighborsTableSchema
