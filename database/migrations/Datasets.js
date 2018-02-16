'use strict'
/** @desc Datasets Migration: creates the datasets collection. */
const Schema = use('Schema')
/** 
 * @desc Datasets table stores the datasets registers that
 * each register has an username, collection, method, date, datasets,
 * result (string) and block id(hash)of the block it belongs.
 * The block can be null if belongs to the current(on construction) block.
 * 
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class DatasetsTableSchema extends Schema {
    up() {
        this.create('datasets', (table) => {
            // Metadata 
            table.increments('id');
            table.string('name', 1024);
            table.string('description', 4086); 
            table.integer('observations'); 
            table.integer('features'); 
            table.float('resolution');
            table.integer('training signals'); // TODO: NOT ACCESIBLE FOR EVALUATORS ,the tr_signals have to be the first n columns in table
            table.string('model_hash', 4086); 
            table.string('app_hash', 4086); 
            table.string('dataset_link', 4086); 
            table.string('dataset_text', 4086); 
            table.string('dataset_blob', 4086); 
            table.string('validation_hash', 4086); // only used id datasets_link is used
            table.string('hash', 4086); 
            table.float('performance'); 
            table.string('created_by', 4086);
            table.string('updated_by', 4086);
            table.string('created_at', 4086);
            table.string('updated_at', 4086);
        })
    }
    down() {
        this.drop('datasets')
    }
}
module.exports = DatasetsTableSchema
