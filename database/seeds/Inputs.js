'use strict'
/** @desc Inputs collection seeds, uses Inputs model, to run execute:
 @example ./ace db:seed [name], they are used to initially populate the database
                                for testing (its, they are going to be implemented later).
 **/
const Inputs = use('App/Model/Inputs')
/** Test data with 3 similar registers only differing in the name, description and id */
const inputsArray = [ {"id":1, "observations":1, "features":1, 
                        "resolution":1, "training_signals":1, "model_hash":"mh", 
                        "app_hash":"ah", "process_hash":"ph", "input_link":"il",
                        "input_text":"it","input_blob":"ib", "validation_hash":"vh", "hash":"h", 
                        "error":0.1, "evaluator_hash":"eh", "output_hash":"oh"
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
        yield Inputs.createMany(inputsArray)
    }
}
module.exports = DatabaseSeeder 
