'use strict'
/** @desc Datasets collection seeds, uses Datasets model, to run execute:
 @example ./ace db:seed [name], they are used to initially populate the database
                                for testing (its, they are going to be implemented later).
 **/
const Datasets = use('App/Model/Datasets')
/** Test data with 3 similar registers only differing in the name, description and id */
const datasetsArray = [ { "id":1, "name":"", "description":"", "observations":1, "features":1, 
                        "resolution":1, "training_signals":1, "model_hash":"mh", 
                        "app_hash":"ah", "dataset_link":"dl", "dataset_text":"dt", "dataset_blob":"db",
                        "validation_hash":"vh", "hash":"h", "performance":0.1},
                    
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
        yield Datasets.createMany(datasetsArray)
    }
}
module.exports = DatabaseSeeder 
