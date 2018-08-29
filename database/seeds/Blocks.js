'use strict'
/** @desc Blocks collection seeds, uses Blocks model, to run execute:
 @example ./ace db:seed [name]
 **/
const Blocks = use('App/Model/Blocks')
/** Test data with 3 similar registers only differing in the name, description and id */
const blocksArray = [
    {"id": 1, "username": "harveybc", "process_hash": "p2h", "param_hash":"pah" ,"hash":"firsthash2", "prev_hash":"pbh", "contents":"","signature":"s","difficulty":0.01, "threshold":0.01, "performance":0.0,"block_time":1,"block_size":1},
    {"id": 2, "username": "harveybc", "process_hash": "p3h", "param_hash":"pah" , "hash":"firsthash3", "prev_hash":"firsthash3", "contents":"","signature":"s","difficulty":0.01, "threshold":0.01, "performance":0.0,"block_time":1,"block_size":1},
    {"id": 3, "username": "harveybc", "process_hash": "ph", "param_hash":"pah" , "hash":"firsthash", "prev_hash":"0", "contents":"","signature":"s","difficulty":0.01, "threshold":0.01, "performance":0.0,"block_time":1,"block_size":1},
    {"id": 4, "username": "harveybc", "process_hash": "ph", "param_hash":"pah" , "hash":"firsthash2", "prev_hash":"firsthash", "contents":"","signature":"s","difficulty":0.01, "threshold":0.018, "performance":0.0,"block_time":1,"block_size":1},
    ] 
/** 
 @desc Database Seeder
 Can be used to seed dummy data to your application database.  Here you can also make use of Factories to create records witn random data.aaaa
 
 @example to execute:
 ./ace db:seed [name]
 */
class DatabaseSeeder {
    * run() {
        // yield Factory.model('App/Model/User').create(5)
        yield Blocks.createMany(blocksArray)
    }
}
module.exports = DatabaseSeeder 
