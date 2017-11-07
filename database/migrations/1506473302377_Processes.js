'use strict'
/** @desc Processes Migration: creates the processes collection. */
const Schema = use('Schema')
/** 
 * @desc Processes table controls a blockchain per process (block time, size, etc..)
 * it has fields for metadata, control, configuration and status of the process. 
 * 
 * A process belongs to an application and it can be accessed by its users. If 
 * the OPoW block time control is selected, a model is optimized to produce the
 * PoW to generate a block in the blockchain. 
 * 
 * Migrations must be executed with the command:
 * @example 
 * ./ace migration:run
 **/
class ProcessesTableSchema extends Schema {
  up () {
    this.create('processes', (table) => {
      // Metadata
      table.increments('id')
      table.string('name', 4086)
      table.text('description', 40860)
      table.string('creator_key',4086)
      table.string('tags',4086)
      table.integer('app_id')
      table.timestamps()
      // Control
      table.boolean('active')
      // Configuration
      table.integer('desired_block_time')
      table.integer('desired_block_size')
      table.integer('block_time_control') // (0=OPoW,1=CPoW,2=block_size_det, 3=block_time_non_det, ,4=block_time_det, 5=block_size_non_det, 6= block_size_det)
     // Optional configuration if using block_time_control>0 (!OPOW) for optimization/evaluation
      table.integer('model_id')
      table.integer('training_set_id')
      table.integer('validation_set_id')
      // Status 
      table.float('difficulty')
      table.integer('last_block_id')  
      table.integer('last_block_date')
      table.integer('last_block_difficulty') 
      table.integer('last_block_time') // in milliseconds 
      table.integer('last_block_size') // in bytes
      // Optional status for LAST BLOCK if using block_time_control>0 (!OPoW) 
      table.integer('last_block_performance')
      // Optional status for LAST OPTIMUM in current block if using block_time_control>0 (!OPoW) 
      table.integer('last_optimum_id')
      table.timestamp('last_optimum_date')
      table.float('last_optimum_performance')
    })
  }
  down () {
    this.drop('processes')
  }
}
module.exports = ProcessesTableSchema
