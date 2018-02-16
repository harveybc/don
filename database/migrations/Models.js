'use strict'
/** @desc Modelos Migration: creates the modelos collection. */
const Schema = use('Schema')
/** 
 * @desc Modelos table stores the modelos registers that
 * each register has an username, collection, method, date, parameters,
 * result (string) and block id(hash)of the block it belongs.
 * The block can be null if belongs to the current(on construction) block.
 * 
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class ModelosTableSchema extends Schema {
    up() {
        this.create('modelos', (table) => {
            // Metadata 
            table.increments('id');
            table.string('name', 1024);
            table.string('description', 4086); 
            table.string('app_hash', 4086); 
            table.string('model_link', 4086); 
            table.string('model_text', 4086); 
            table.string('model_blob', 4086); 
            table.string('validation_hash', 4086); 
            table.string('hash', 4086); 
            table.string('tags', 4086); 
            table.string('created_by', 4086);
            table.string('updated_by', 4086);
            table.string('created_at', 4086);
            table.string('updated_at', 4086);
        })
    }
    down() {
        this.drop('modelos')
    }
}
module.exports = ModelosTableSchema
