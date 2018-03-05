'use strict'
/** @desc Inputs Migration: creates the inputs collection. */
const Schema = use('Schema')
/** 
 * @desc Inputs table stores the inputs registers that
 * each register has an username, collection, method, date, inputs,
 * result (string) and block id(hash)of the block it belongs.
 * The block can be null if belongs to the current(on construction) block.
 * 
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class InputsTableSchema extends Schema {
    up() {
        this.create('inputs', (table) => {
            // Metadata 
            table.increments('id');
            table.integer('observations');
            table.integer('features');
            table.float('resolution');
            table.integer('training_signals'); // if !=0, returns avg error
            table.string('model_hash', 4086);
            table.string('app_hash', 4086);
            table.string('process_hash', 4086);
            table.string('input_link', 4086);
            table.string('input_text', 4086);
            table.string('input_blob', 4086);
            table.string('validation_hash', 4086); // only used id inputs_link is used
            table.string('hash', 4086);
            table.float('error'); // calculated if training_signals >0
            table.string('evaluator_hash', 4086); // UPDATED BY THE EVALUATOR?
            table.string('output_hash', 4086); // IN THE INPUTS TABLE, CREATED BY THE EVALUATOR
            table.string('created_by', 4086);
            table.string('updated_by', 4086);// TODO: THE EVALUATOR GOES HERE BOTH ON fetching and finishing
            table.string('created_at', 4086);
            table.string('updated_at', 4086);
        })
    }
    down() {
        this.drop('inputs')
    }
}
module.exports = InputsTableSchema
