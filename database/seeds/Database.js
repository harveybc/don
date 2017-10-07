'use strict'
/** Processes collection seeds, uses Processes model, to run execute:
@example ./ace make:seed [name]
 **/
const Process = use('App/Model/Processes')
/** Test data with 3 similar registers only differing in the name, description and id */
const processArray=[
                    {"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "creator_key": "THAKEY", "tags": ["p2p", "forex", "dqn"],
                        "application_id": 2, "created_at":"2017-09-02 05:22:30", "updated_at": "2017-09-03 05:22:31", 
                        "active":true, "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "model_id":1, "training_set_id":1, "validation_set_id":1,
                        "difficulty": 0.0009, "last_block_id":1,"last_block_date":"2017-09-03 05:22:31", "last_block_difficulty":0.1 ,"last_block_time": 86400, 
                        "last_block_size": 2048, "last_block_performance":0.88,  "last_optimum_id": 1, "last_optimum_date": "2017-09-03 06:22:31","last_optimum_performance": 0.8983}, 
                    {"id": 2, "name": "Test process 2", "description": "Test process 2 -  stub testing", "creator_key": "THAKEY", "tags": ["p2p", "forex", "dqn"],
                        "application_id": 2, "created_at":"2017-09-02 05:22:30", "updated_at": "2017-09-03 05:22:31", 
                        "active":true, "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "model_id":1, "training_set_id":1, "validation_set_id":1,
                        "difficulty": 0.0009, "last_block_id":1,"last_block_date":"2017-09-03 05:22:31", "last_block_difficulty":0.1 ,"last_block_time": 86400, 
                        "last_block_size": 2048, "last_block_performance":0.88,  "last_optimum_id": 1, "last_optimum_date": "2017-09-03 06:22:31","last_optimum_performance": 0.8983}, 
                    {"id": 3, "name": "Test process 3", "description": "Test process 3 -  stub testing", "creator_key": "THAKEY", "tags": ["p2p", "forex", "dqn"],
                        "application_id": 2, "created_at":"2017-09-02 05:22:30", "updated_at": "2017-09-03 05:22:31", 
                        "active":true, "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "model_id":1, "training_set_id":1, "validation_set_id":1,
                        "difficulty": 0.0009, "last_block_id":1,"last_block_date":"2017-09-03 05:22:31", "last_block_difficulty":0.1 ,"last_block_time": 86400, 
                        "last_block_size": 2048, "last_block_performance":0.88,  "last_optimum_id": 1, "last_optimum_date": "2017-09-03 06:22:31","last_optimum_performance": 0.8983}, 
                   ]
               
/** 
 Database Seeder
 Can be used to seed dummy data to your application database. 
 Here you can also make use of Factories to create records witn random data.

 @example make use of Ace to generate a new seed
./ace make:seed [name]
*/
class DatabaseSeeder {
  * run () {
    // yield Factory.model('App/Model/User').create(5)
    yield Process.createMany(processArray) 
  }
}
module.exports = DatabaseSeeder
