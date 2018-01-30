'use strict'
/** @desc Authorization Migration: creates the authorization collection. */
const Schema = use('Schema')
/** 
 * @desc Authorization table stores the public_key of a user, and pass_hash (TODO: Hash of pkey 
 * for small transfer).   
 * 
 * TODO: QUITAR FOTO DE PLANTILLA DE ADMINLTE Y REEMPLAZAR CON ICONO
 * 
 * A process belongs to an application and it can be accessed by its users. If 
 * the OPoW block time control is selected, a model is optimized to produce the
 * PoW to generate a block in the blockchain. 
 * sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class AuthorizationTableSchema extends Schema {
  up () {
    this.create('authorizations', (table) => {
      // Metadata 
      table.increments('id');
      table.string('username', 256);
      table.string('process_hash', 4086);
      table.integer('role');
      table.string('created_by', 4086);
      table.string('updated_by', 4086);
      table.string('created_at', 4086);
      table.string('updated_at', 4086);
      // Control
      table.boolean('active');
    })
  }
  down () {
    this.drop('authorizations')
  }
}
module.exports = AuthorizationTableSchema
