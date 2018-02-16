'use strict'
/** @desc Parameters Migration: creates the parameters collection. */
const Schema = use('Schema')
/** 
 * @desc Parameters table stores the parameters registers that
 * each register has an username, collection, method, date, parameters,
 * result (string) and block id(hash)of the block it belongs.
 * The block can be null if belongs to the current(on construction) block.
 * 
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class ParametersTableSchema extends Schema {
    up() {
        this.create('parameters', (table) => {
            // Metadata 
            table.increments('id');
            table.string('process_hash', 1024); // proceso que encontró el parámetro
            table.string('model_hash', 4086); 
            table.string('app_hash', 4086); 
            table.string('parameter_link', 4086); 
            table.string('parameter_text', 4086); 
            table.string('parameter_blob', 4086); 
            table.string('validation_hash', 4086); // only used id parameters_link is used
            table.string('hash', 4086); 
            table.float('performance'); 
            table.string('created_by', 4086);
            table.string('updated_by', 4086);
            table.string('created_at', 4086);
            table.string('updated_at', 4086);
        })
    }
    down() {
        this.drop('parameters')
    }
}
module.exports = ParametersTableSchema
