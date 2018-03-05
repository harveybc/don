'use strict'
/** @desc Models collection seeds, uses Models model, to run execute:
 @example ./ace db:seed [name], they are used to initially populate the database
                                for testing (its, they are going to be implemented later).
 **/
const Models = use('App/Model/Models')
/** Test data with 3 similar registers only differing in the name, description and id */
const modelsArray = [ {"id":1, "name":"", "description":"", 
                        "app_hash":"ah", "model_link":"ml",
                        "model_text":"mt","model_blob":"mb", "validation_hash":"vh", "hash":"h", 
                        "tags":""
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
        // yield Factory.model('App/Model/User').create(5)
        yield Models.createMany(modelsArray)
    }
}
module.exports = DatabaseSeeder 
