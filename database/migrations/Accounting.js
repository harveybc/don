'use strict'
/** @desc Accounting Migration: creates the accounting collection. */
const Schema = use('Schema')
/** 
 * @desc Accounting table stores the accounting registers that
 * each register has an username, collection, method, date, parameters,
 * result (string) and block id(hash)of the block it belongs.
 * The block can be null if belongs to the current(on construction) block.
 * 
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class AccountingTableSchema extends Schema {
  up () {
    this.create('accountings', (table) => {
      // Metadata 
      table.increments('id');
      table.string('username', 256);
      table.integer('collection'); 

      //// Ejemplo de transacción de ataque con y sin target(closer o al azar en la misma pos): 
      //// con taget = in:attack_code,target_id;out:target_id,new_target_health
      //// sin target = in:attack_code,NULL;out:target_id,new_target_health

      //// O usar esta tabla con IN: Collection(ie:Combat), Method(ie:Attack), Parameters(ie:attack_id, target_id, last_target_state_id from last transaction) 
      //// y con OUT: result_code, (target_id, new_target_state_id )
      //// de esta manera con cada bloque el estado del juego actualiza el health (en la colección State) basado en el orden de las transacciones
      
      
      table.integer('method');
      table.string('date');
      table.string('parameters');
      table.string('result');
      table.integer('block_id');
            table.string('created_at');

      table.string('updated_at');

      
})
  }
  down () {
    this.drop('accountings')
  }
}
module.exports = AccountingTableSchema
