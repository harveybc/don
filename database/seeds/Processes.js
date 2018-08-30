'use strict'
/** @desc Processes collection seeds, uses Processes model, to run execute:
@example ./ace db:seed [name]
 **/
const Process = use('App/Model/Processes')
/** Test data with 3 similar registers only differing in the name, description and id */
const processArray=[
                    {"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "creator_key": "THAKEY", "tags": ["p2p", "forex", "dqn"],
                        "hash":"ph", "app_hash": "ah", "created_at":"2017-09-02 05:22:30", "updated_at": "2017-09-03 05:22:31", 
                        "active":true, "desired_block_time": 1, "desired_block_size": 0, "block_time_control": 0, "model_id":1, "training_set_id":1, "validation_set_id":1,
                        "last_block_hash":"firsthash","last_block_date":"2017-09-03 05:22:31", "last_block_time": 1, 
                        "current_threshold":0.001,"last_threshold":0.01,"current_block_time":1, // con cbp=0.898 se debería crear nuevo block.
                        "last_block_size": 0, "last_block_performance":0.01,"current_block_performance": 0.01,  "last_optimum_id": 1, "last_optimum_date": "2017-09-03 06:22:31"}, 
                    {"id": 2, "name": "Test process 2", "description": "Test process 2 -  stub testing", "creator_key": "THAKEY", "tags": ["p2p", "forex", "dqn"],
                        "hash":"p2h", "app_hash": "ah", "created_at":"2017-09-02 05:22:30", "updated_at": "2017-09-03 05:22:31", 
                        "active":true, "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 0, "model_id":1, "training_set_id":1, "validation_set_id":1,
                        "last_block_hash":"1","last_block_date":"2017-09-03 05:22:31","last_block_time": 86400, 
                        "current_threshold":0.018,"last_threshold":0.04,"current_block_time":82000,
                        "last_block_size": 2048, "last_block_performance":0.88,"current_block_performance": 0.897,  "last_optimum_id": 1, "last_optimum_date": "2017-09-03 06:22:31"}, 
                    {"id": 3, "name": "Test process 3", "description": "Test process 3 -  stub testing", "creator_key": "THAKEY", "tags": ["p2p", "forex", "dqn"],
                        "hash":"p3h", "app_hash": "ah", "created_at":"2017-09-02 05:22:30", "updated_at": "2017-09-03 05:22:31", 
                        "active":true, "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 0, "model_id":1, "training_set_id":1, "validation_set_id":1,
                        "last_block_hash":"1","last_block_date":"2017-09-03 05:22:31", "last_block_time": 86400, 
                        "current_threshold":0.018,"last_threshold":0.04,"current_block_time":82000,
                        "last_block_size": 2048, "last_block_performance":0.88,"current_block_performance": 0.897,  "last_optimum_id": 1, "last_optimum_date": "2017-09-03 06:22:31"} 
                   ];
               
/** 
 @desc Database Seeder
 Can be used to seed dummy data to your application database. 
 Here you can also make use of Factories to create records witn random data.

 @example to execute:
./ace db:seed [name]
*/
class DatabaseSeeder {
  * run () {
    // yield Factory.model('App/Model/User').create(5)
    yield Process.createMany(processArray) 
  }
}
module.exports = DatabaseSeeder
