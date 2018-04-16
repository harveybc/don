'use strict'
/** @desc Neighbors collection seeds, they are used to initially populate the database
 for testing (its, they are going to be implemented later). To run execute:
 @example  
 ./ace db:seed [name]
 **/
const Neighbors = use('App/Model/Neighbors')
/** Test data with 3 similar registers only differing in the name, description and id */
const neighborsArray = [{
        "id": 1 ,
        "app_hash": "ah1",
        "address": "http://192.168.0.241:3338",
        "distance": 2,
        "latency": 500,
        "selection_method": 0
    },{
        "id": 2 ,
        "app_hash": "ah2",
        "address": "http://192.168.0.242:3338",
        "distance": 2,
        "latency": 500,
        "selection_method": 0
    },
] 
/** 
 @desc Database Seeder
 Can be used to seed dummy data to your application database.  Here you can also make use of Factories to create records witn random data.aaaa
 
 @example to execute:
 ./ace db:seed [name]
 */
class DatabaseSeeder {
    * run() {
        // yield Factory.neighbor('App/Neighbor/User').create(5)
        yield Neighbors.createMany(neighborsArray)
    }
}
module.exports = DatabaseSeeder
