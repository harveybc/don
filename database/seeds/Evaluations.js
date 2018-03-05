'use strict'
/** @desc Evaluations collection seeds, uses Evaluations model, to run execute:
 @example ./ace db:seed [name], they are used to initially populate the database
                                for testing (its, they are going to be implemented later).
 **/
const Evaluations = use('App/Model/Evaluations')
/** Test data with 3 similar registers only differing in the name, description and id */
const evaluationsArray = [ {"id":1, "observations":1, "features":1, 
                        "resolution":1, "training_signals":1, "model_hash":"mh", 
                        parameter_hash:"ph", input_hash:"ih", process_hash:"ph", hash:"hash"},
                       
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
        yield Evaluations.createMany(evaluationsArray)
    }
}
module.exports = DatabaseSeeder 
