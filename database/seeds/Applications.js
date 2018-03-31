'use strict'
/** @desc Applications collection seeds, they are used to initially populate the database
 for testing (its, they are going to be implemented later). To run execute:
 @example 
 ./ace db:seed [name]
 **/
const Applications = use('App/Model/Applications')
/** Test data with 3 similar registers only differing in the name, description and id */
const applicationsArray = [{ 
        "id": 1,
        "name": "example",
        "hash": "ah",
        
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
        // yield Factory.application('App/Application/User').create(5)
        yield Applications.createMany(applicationsArray)
    }
}
module.exports = DatabaseSeeder
