'use strict'

const Schema = use('Schema')

class ProcessesTableSchema extends Schema {

  up () {
    var expected_response = '{"jsonrpc": "2.0", "result": [{"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "creator_key": "CREATOR_KEY", "created_at": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},            {"id": 2, "name": "Test process 2", "description": "Test process 2 -  stub testing", "creator_key": "CREATOR_KEY", "date": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},            {"id": 3, "name": "Test process 3", "description": "Test process 3 -  stub testing", "creator_key": "CREATOR_KEY", "date": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009}], "id":3}';
    var parsed_expected_response = JSON.parse(expected_response);  
    this.create('processes', (table) => {
      table.increments('id')
      table.string('name', 4086)
      table.text('description', 40860)
      table.string('creator_key',4086)
      table.timestamps()
      table.string('tags',4086)
      table.integer('application_id')
      table.integer('last_block_time') 
      table.integer('last_block_size')
      table.float('last_optimum_performance')
      table.integer('last_optimum_id')
      table.timestamp('date_last_optimum')
      table.integer('desired_block_time')
      table.integer('desired_block_size')
      // block_time_control (0=CPoW,1=OPoW,2=block_size_det, 3=block_time_non_det, ,4=block_time_det, 5=block_size_non_det, 6= block_size_det), [
      table.integer('block_time_control')
      table.integer('difficulty')
    }).insert(parsed_expected_response.result)
  }

  down () {
    this.drop('processes')
  }

}

module.exports = ProcessesTableSchema
