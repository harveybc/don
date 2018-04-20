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
      // TODO: ADICIONAR PROCESS_HASH
    this.create('processes', (table) => {
      // Metadata
      table.increments('id')
      table.string('name', 4086)
      table.text('description', 40860)
      table.string('creator_key',4086)
      table.string('hash',4086)
      table.string('tags',4086)
      table.integer('app_hash')
      table.string('created_by', 4086);
      table.string('updated_by', 4086);
      table.string('created_at', 4086);
      table.string('updated_at', 4086);
      // Control
      table.boolean('active')
      // Configuration
      // 0=OPoWdet,1=OPoWnodet,2=CPoW,
      // 3=block_size_det, 4=block_size_non_det,
      // 5=block_time_det, 6=block_time_non_det
      table.integer('block_time_control') 
      // OPOW det
      table.float('threshold')
      table.float('last_block_performance')
      table.float('current_block_performance')
      // OPOW no-det
      table.float('nodet_threshold')
      // CPOW
      table.float('difficulty')      
      table.float('last_block_difficulty') 
      // NoDetSize
      table.integer('last_block_size') // in bytes
      table.integer('desired_block_size') // in bytes
      // DetSize every node must configure a unique position
      table.integer('position')
      table.integer('last_position')
      // NoDetTime
      table.integer('desired_block_time') // in milliseconds 
      table.integer('last_block_time') // in milliseconds 
      // DetTime similar to detsize
      table.float('any_variable')
      //TODO: anyvariable uses the same thresholds as performance in OPoW 
      
      // Optional configuration if using block_time_control>0 (!OPOW) for optimization/evaluation
      table.integer('model_id')
      table.integer('training_set_id')
      table.integer('validation_set_id')
      // Status 
      table.string('last_block_hash')  
      table.string('last_block_date')
      // Optional status for LAST OPTIMUM in current block if using block_time_control>0 (!OPoW) 
      table.integer('last_optimum_id')
      table.timestamp('last_optimum_date')
      
    })
  }
  down () {
    this.drop('processes')
  }
}
module.exports = ProcessesTableSchema
