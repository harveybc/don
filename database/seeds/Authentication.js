'use strict'
/** @desc Authentication collection seeds, uses Authentication model, to run execute:
 @example ./ace db:seed [name]
 **/
const Authentication = use('App/Model/Authentication')
/** Test data with 3 similar registers only differing in the name, description and id */
const authenticationArray = [{"id": 1, "public_key": "AAAAAAA", "username": "harveybc",   "app_hash": "ah",
                 "name": "Harvey Bastidas", "created_by": "AAA001", "updated_by": "AAA001",
                 "pass_hash": "$2a$04$ntNHmofQoMoajG89mTEM2uSR66jKXBgRQJnCgqfNN38aq9UkN4Y6q", "active": true},
    {"id": 2, "public_key": "AAAAAAA", "username": "testnode", "app_hash": "ah", "name":
                "Test User Node (ProcessAdmin)", "created_by": "AAA002", "updated_by": "AAA002",
                "pass_hash": "$2a$04$ntNHmofQoMoajG89mTEM2uSR66jKXBgRQJnCgqfNN38aq9UkN4Y6q", "active": true},
    {"id": 3, "public_key": "AAAAAAA", "username": "testoptimizer", "app_hash": "ah", "name":
                "Test User Optimizer", "created_by": "AAA003", "updated_by": "AAA003",
                "pass_hash": "$2a$04$ntNHmofQoMoajG89mTEM2uSR66jKXBgRQJnCgqfNN38aq9UkN4Y6q", "active": true},
    {"id": 4, "public_key": "AAAAAAA", "username": "testevaluator", "app_hash": "ah", "name":
                "Test User Evaluator", "created_by": "AAA004", "updated_by": "AAA004",
                "pass_hash": "$2a$04$ntNHmofQoMoajG89mTEM2uSR66jKXBgRQJnCgqfNN38aq9UkN4Y6q", "active": true},
    {"id": 5, "public_key": "AAAAAAA", "username": "testclient", "app_hash": "ah", "name":
                "Test User Client", "created_by": "AAA005", "updated_by": "AAA005",
                "pass_hash": "$2a$04$ntNHmofQoMoajG89mTEM2uSR66jKXBgRQJnCgqfNN38aq9UkN4Y6q", "active": true}
] 
/** 
 @desc Database Seeder
 Can be used to seed dummy data to your application database. 
 Here you can also make use of Factories to create records witn random data.
 
 @example to execute:
 ./ace db:seed [name]
 */
class DatabaseSeeder {
    * run() {
        // yield Factory.model('App/Model/User').create(5)
        yield Authentication.createMany(authenticationArray)
    }
}
module.exports = DatabaseSeeder
