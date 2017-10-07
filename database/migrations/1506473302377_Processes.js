'use strict'
/** Processes Migration: creates the processes collection. */
const Schema = use('Schema')
/** 
 * Processes table controls a blockchain per process (block time, size, etc..)
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
    var expected_response = '{"jsonrpc": "2.0", "result": [{"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "creator_key": "CREATOR_KEY", "created_at": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},            {"id": 2, "name": "Test process 2", "description": "Test process 2 -  stub testing", "creator_key": "CREATOR_KEY", "date": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},            {"id": 3, "name": "Test process 3", "description": "Test process 3 -  stub testing", "creator_key": "CREATOR_KEY", "date": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009}], "id":3}';
    var parsed_expected_response = JSON.parse(expected_response);  
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
    this.insert(parsed_expected_response.result)
  }
  down () {
    this.drop('processes')
  }
}
module.exports = ProcessesTableSchema
