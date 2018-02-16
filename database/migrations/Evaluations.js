'use strict'
/** @desc Evaluations Migration: creates the evaluations collection. */
const Schema = use('Schema')
/** 
 * @desc Evaluations table stores the evaluations registers that
 * each register has an username, collection, method, date, evaluations,
 * result (string) and block id(hash)of the block it belongs.
 * The block can be null if belongs to the current(on construction) block.
 * 
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class EvaluationsTableSchema extends Schema {
    up() {
        this.create('evaluations', (table) => {
            // Metadata 
            table.increments('id');
            table.integer('observations'); 
            table.integer('features'); 
            table.float('resolution');
            table.integer('training signals'); // if >0, calculate avg error from evaluated results
            table.string('model_hash', 4086); 
            table.string('parameter_hash', 4086);
            table.string('input_hash', 4086);
            table.string('process_hash', 4086); 
            table.string('hash', 4086); // NOT included in hash,def=NULL
            table.string('created_by', 4086);
            table.string('updated_by', 4086);
            table.string('created_at', 4086);
            table.string('updated_at', 4086);
        })
    }
    down() {
        this.drop('evaluations')
    }
}
module.exports = EvaluationsTableSchema
