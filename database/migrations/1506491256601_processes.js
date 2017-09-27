'use strict'

const Schema = use('Schema')

class ProcessesTableSchema extends Schema {

  up () {
        var expected_response = '{"jsonrpc": "2.0", "result": [{"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "creator_key": "CREATOR_KEY", "created_at": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},            {"id": 2, "name": "Test process 2", "description": "Test process 2 -  stub testing", "creator_key": "CREATOR_KEY", "date": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},            {"id": 3, "name": "Test process 3", "description": "Test process 3 -  stub testing", "creator_key": "CREATOR_KEY", "date": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009}], "id":3}';
    var parsed_expected_response = JSON.parse(expected_response);
    
    this.insert(parsed_expected_response.result)
  }

  down () {
    this.table('processes', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = ProcessesTableSchema
