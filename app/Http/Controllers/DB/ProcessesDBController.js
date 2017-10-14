'use strict';
/** @desc
    Processeses dummy controller for testing database, it uses static test data.
 */
class ProcessesDBController {
    /** @desc Returns a list of metadata for found processes in a view */
    * MetadataList(request, response) {
        const Database = use('Database');
        const result = yield Database.select('id','name','description','creator_key','tags','app_id','created_at','updated_at').from('processes').limit(3);
        /** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the metadata for the <id> process */
    * MetadataItem(request, response) {
        const Database = use('Database');
        const process_id = request.param('id');
        const result = yield Database.select('id','name','description','creator_key','tags','app_id','created_at','updated_at').from('processes').where('id',process_id);
        yield response.sendView('master_JSON', {result: result[0], request_id: 3});
    }
    /** @desc Returns a list of processes */
    * GetList(request, response) {
        const Database = use('Database');
        const result = yield Database.select('*').from('processes').limit(request.param('max_results'));
        /** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the the <id> process */
    * GetItem(request, response) {
        const Database = use('Database');
        const process_id = request.param('id');
        const result = yield Database.select('*').from('processes').where('id',process_id);
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the <id> of the created process */
    * CreateItem(request, response) { 
        // generate parameters for query
        const Database = use('Database');
        const url_params=request.get();
        const app_id = url_params.app_id;
        const public_key = url_params.public_key;
        const name = url_params.name;
        const description = url_params.description;
        const model_id = url_params.model_id;
        const training_id = url_params.training_id;
        const validation_id = url_params.validation_id;
        // perform query and send view
        const process_id = yield Database.table('processes').insert({'app_id':app_id,'creator_key':public_key,
            'name':name,'description':description,'model_id':model_id,'training_set_id':training_id,'validation_set_id':validation_id});
        const result = {"id": process_id};
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
        /** @desc Returns the <id> of the created process */
    * UpdateItem(request, response) { 
        // generate parameters for query
        const Database = use('Database');
        const url_params=request.get();
        const app_id = url_params.app_id;
        const public_key = url_params.public_key;
        const name = url_params.name;
        const description = url_params.description;
        const model_id = url_params.model_id;
        const training_id = url_params.training_id;
        const validation_id = url_params.validation_id;
        // perform query and send view
        const process_id = yield Database.table('processes').insert({'app_id':app_id,'creator_key':public_key,
            'name':name,'description':description,'model_id':model_id,'training_set_id':training_id,'validation_set_id':validation_id});
        const result = {"id": process_id};
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the <id> of the created process */
    * DeleteItem(request, response) {
        const Database = use('Database');
        const process_id = request.param('id');
        const deleted_count = yield Database.table('processes').where('id',process_id).delete();
        const result = {"deleted_count": deleted_count};
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Renders the admin view  */
    * AdminView(request, response) {
        var test_d=[{'id':1,"name":"Test process 1","description":"Test process 1 - stub testing","creator_key":"THAKEY","tags":null,"app_id":2,"created_at":"2017-10-08 07:54:50","updated_at":"2017-10-08 07:54:50","active":1,"desired_block_time":85000,"desired_block_size":0,"block_time_control":1,"model_id":1,"training_set_id":1,"validation_set_id":1,"difficulty":0.0009,"last_block_id":1,"last_block_date":"2017-09-03 05:22:31","last_block_difficulty":0.1,"last_block_time":86400,"last_block_size":2048,"last_block_performance":0.88,"last_optimum_id":1,"last_optimum_date":"2017-09-03 06:22:31","last_optimum_performance":0.8983},{"id":2,"name":"Test process 2","description":"Test process 2 - stub testing","creator_key":"THAKEY","tags":null,"app_id":2,"created_at":"2017-10-08 07:54:50","updated_at":"2017-10-08 07:54:50","active":1,"desired_block_time":85000,"desired_block_size":0,"block_time_control":1,"model_id":1,"training_set_id":1,"validation_set_id":1,"difficulty":0.0009,"last_block_id":1,"last_block_date":"2017-09-03 05:22:31","last_block_difficulty":0.1,"last_block_time":86400,"last_block_size":2048,"last_block_performance":0.88,"last_optimum_id":1,"last_optimum_date":"2017-09-03 06:22:31","last_optimum_performance":0.8983},{"id":3,"name":"Test process 3","description":"Test process 3 - stub testing","creator_key":"THAKEY","tags":null,"app_id":2,"created_at":"2017-10-08 07:54:50","updated_at":"2017-10-08 07:54:50","active":1,"desired_block_time":85000,"desired_block_size":0,"block_time_control":1,"model_id":1,"training_set_id":1,"validation_set_id":1,"difficulty":0.0009,"last_block_id":1,"last_block_date":"2017-09-03 05:22:31","last_block_difficulty":0.1,"last_block_time":86400,"last_block_size":2048,"last_block_performance":0.88,"last_optimum_id":1,"last_optimum_date":"2017-09-03 06:22:31","last_optimum_performance":0.8983},{"id":5,"name":"TEST4","description":"TEST4_desc","creator_key":"PUB_KEY","tags":null,"app_id":1,"created_at":null,"updated_at":null,"active":null,"desired_block_time":null,"desired_block_size":null,"block_time_control":null,"model_id":1,"training_set_id":1,"validation_set_id":"TEST4","difficulty":null,"last_block_id":null,"last_block_date":null,"last_block_difficulty":null,"last_block_time":null,"last_block_size":null,"last_block_performance":null,"last_optimum_id":null,"last_optimum_date":null,"last_optimum_performance":null},{"id":6,"name":"TEST4","description":"TEST4_desc","creator_key":"PUB_KEY","tags":null,"app_id":1,"created_at":null,"updated_at":null,"active":null,"desired_block_time":null,"desired_block_size":null,"block_time_control":null,"model_id":1,"training_set_id":1,"validation_set_id":"TEST4","difficulty":null,"last_block_id":null,"last_block_date":null,"last_block_difficulty":null,"last_block_time":null,"last_block_size":null,"last_block_performance":null,"last_optimum_id":null,"last_optimum_date":null,"last_optimum_performance":null},{"id":7,"name":"TEST4","description":"TEST4_desc","creator_key":"PUB_KEY","tags":null,"app_id":1,"created_at":null,"updated_at":null,"active":null,"desired_block_time":null,"desired_block_size":null,"block_time_control":null,"model_id":1,"training_set_id":1,"validation_set_id":"TEST4","difficulty":null,"last_block_id":null,"last_block_date":null,"last_block_difficulty":null,"last_block_time":null,"last_block_size":null,"last_block_performance":null,"last_optimum_id":null,"last_optimum_date":null,"last_optimum_performance":null},{"id":8,"name":"TEST4","description":"TEST4_desc","creator_key":"PUB_KEY","tags":null,"app_id":1,"created_at":null,"updated_at":null,"active":null,"desired_block_time":null,"desired_block_size":null,"block_time_control":null,"model_id":1,"training_set_id":1,"validation_set_id":"TEST4","difficulty":null,"last_block_id":null,"last_block_date":null,"last_block_difficulty":null,"last_block_time":null,"last_block_size":null,"last_block_performance":null,"last_optimum_id":null,"last_optimum_date":null,"last_optimum_performance":null},{"id":9,"name":"TEST4","description":"TEST4_desc","creator_key":"PUB_KEY","tags":null,"app_id":1,"created_at":null,"updated_at":null,"active":null,"desired_block_time":null,"desired_block_size":null,"block_time_control":null,"model_id":1,"training_set_id":1,"validation_set_id":"TEST4","difficulty":null,"last_block_id":null,"last_block_date":null,"last_block_difficulty":null,"last_block_time":null,"last_block_size":null,"last_block_performance":null,"last_optimum_id":null,"last_optimum_date":null,"last_optimum_performance":null},{"id":10,"name":"TEST4","description":"TEST4_desc","creator_key":"PUB_KEY","tags":null,"app_id":1,"created_at":null,"updated_at":null,"active":null,"desired_block_time":null,"desired_block_size":null,"block_time_control":null,"model_id":1,"training_set_id":1,"validation_set_id":"TEST4","difficulty":null,"last_block_id":null,"last_block_date":null,"last_block_difficulty":null,"last_block_time":null,"last_block_size":null,"last_block_performance":null,"last_optimum_id":null,"last_optimum_date":null,"last_optimum_performance":null},{"id":11,"name":"TEST4","description":"TEST4_desc","creator_key":"PUB_KEY","tags":null,"app_id":1,"created_at":null,"updated_at":null,"active":null,"desired_block_time":null,"desired_block_size":null,"block_time_control":null,"model_id":1,"training_set_id":1,"validation_set_id":"TEST4","difficulty":null,"last_block_id":null,"last_block_date":null,"last_block_difficulty":null,"last_block_time":null,"last_block_size":null,"last_block_performance":null,"last_optimum_id":null,"last_optimum_date":null,"last_optimum_performance":null}];

        yield response.sendView('admin_view',{
            title: 'Processes Admin - Singularity',
            header: 'Processes',
            description: 'Administrative View',
            collection: 'Processes',
            view: 'Admin',
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            content: test_d
                    
                    
        });
    }
} 
module.exports = ProcessesDBController;
    