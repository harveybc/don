'use strict'
/** @desc Parameters collection seeds, uses Parameters parameter, to run execute:
 @example ./ace db:seed [name], they are used to initially populate the database
 for testing (its, they are going to be implemented later).
 **/
const Parameters = use('App/Model/Parameters')
/** Test data with 3 similar registers only differing in the name, description and id */
const parametersArray = [{
        "process_hash": "ph", "model_hash": "mh",
        "app_hash": "ah", "parameter_link": "ml",
        "parameter_text": "mt", "parameter_blob": "mb", "validation_hash": "vh",
        "hash": "h", "performance": 0.5
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
        // yield Factory.parameter('App/Parameter/User').create(5)
        yield Parameters.createMany(parametersArray)
    }
}
module.exports = DatabaseSeeder
