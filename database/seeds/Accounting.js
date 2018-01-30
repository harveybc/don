'use strict'
/** @desc Accounting collection seeds, uses Accounting model, to run execute:
 @example ./ace db:seed [name]
 **/
const Accounting = use('App/Model/Accounting')
/** Test data with 3 similar registers only differing in the name, description and id */
const accountingArray = [
    {"id": 1, "username": "harveybc", "process_hash": "ph", "collection": 1, "method": 1, "date":"2017-09-03 06:22:31", "parameters":"", "result":"", "block_hash": "bh"},
    {"id": 2, "username": "harveybc", "process_hash": "ph", "collection": 1, "method": 1, "date":"2017-09-03 06:22:31", "parameters":"", "result":"", "block_hash": "bh"},
    {"id": 3, "username": "harveybc", "process_hash": "ph", "collection": 1, "method": 1, "date":"2017-09-03 06:22:31", "parameters":"", "result":"", "block_hash": "bh"},
    {"id": 4, "username": "harveybc", "process_hash": "ph", "collection": 1, "method": 1, "date":"2017-09-03 06:22:31", "parameters":"", "result":"", "block_hash": "bh"},
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
        yield Accounting.createMany(accountingArray)
    }
}
module.exports = DatabaseSeeder 
