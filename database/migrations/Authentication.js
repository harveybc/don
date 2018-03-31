'use strict'
/** @desc Authentication Migration: creates the authentication collection. */
const Schema = use('Schema')
/** 
 * @desc Authentication table stores the public_key of a user, and pass_hash (TODO: Hash of pkey 
 * for small transfer).   
 * 
 * TODO: QUITAR FOTO DE PLANTILLA DE ADMINLTE Y REEMPLAZAR CON ICONO
 * 
 * A process belongs to an application and it can be accessed by its users. If 
 * the OPoW block time control is selected, a model is optimized to produce the
 * PoW to generate a block in the blockchain. 
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class AuthenticationTableSchema extends Schema {
    up() {
        this.create('authentications', (table) => {
            // Metadata 
            table.increments('id');
            table.string('username', 256);
            table.string('app_hash', 4086); // Hash field of the app collection
            table.string('name', 4086);
            table.string('public_key', 4086);
            table.string('pass_hash', 256);
            table.integer('max_connections');
            table.integer('max_neighbors');
            table.string('created_by', 4086);
            table.string('updated_by', 4086);
            table.string('created_at', 4086);
            table.string('updated_at', 4086);
            table.boolean('active');
        })
    }
    down() {
        this.drop('authentications');
    }
}
module.exports = AuthenticationTableSchema;
