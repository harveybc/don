'use strict';
/** @desc
 Processeses dummy controller for testing database, it uses static test data.
 */
class ProcessesDBController {
    /** @desc Returns a list of metadata for found processes in a view */
    * MetadataList(request, response) {
        const Database = use('Database');
        const result = yield Database.select('id', 'name', 'description', 'creator_key', 'tags', 'app_id', 'created_at', 'updated_at').from('processes').limit(3);
        /** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the metadata for the <id> process */
    * MetadataItem(request, response) {
        const Database = use('Database');
        const process_id = request.param('id');
        const result = yield Database.select('id', 'name', 'description', 'creator_key', 'tags', 'app_id', 'created_at', 'updated_at').from('processes').where('id', process_id);
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
        const result = yield Database.select('*').from('processes').where('id', process_id);
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the <id> of the created process */
    * CreateItem(request, response) {

        // TODO: CORREGIR SEGUN PARAMS DE TESTS:
        /*
         *                      {'key': 'name', 'value': 'TEST4'},
         {'key': 'description', 'value': 'TEST4_desc'},
         {'key': 'public_key', 'value': 'PUB_KEY'},
         {'key': 'tags', 'value': 'forex,NEAT,DQN'},
         {'key': 'app_id', 'value': 1},
         {'key': 'active', 'value': true},
         {'key': 'desired_block_time', 'value': 5 * 60},
         {'key': 'desired_block_size', 'value': 0},
         {'key': 'block_time_control', 'value': 'opow'},
         {'key': 'model_id', 'value': 1},
         {'key': 'training_id', 'value': 1},
         {'key': 'validation_id', 'value': 'TEST4'},
         {'key': 'difficulty', 'value': 0.1},
         {'key': 'format', 'value': 'jsonrpc2'}
         */
        // generate parameters for query
        const Database = use('Database');
        const url_params = request.get();
        const app_id = url_params.app_id;
        const public_key = url_params.public_key;
        const name = url_params.name;
        const description = url_params.description;
        const model_id = url_params.model_id;
        const training_id = url_params.training_id;
        const validation_id = url_params.validation_id;
        // perform query and send view
        const process_id = yield Database.table('processes').insert({'app_id': app_id, 'creator_key': public_key,
            'name': name, 'description': description, 'model_id': model_id, 'training_set_id': training_id, 'validation_set_id': validation_id});
        const result = {"id": process_id};
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the <id> of the created process */
    * UpdateItem(request, response) {

        // TODO: CORREGIR SEGUN PARAMS DE TESTS
        // generate parameters for query
        const Database = use('Database');
        const url_params = request.get();
        const app_id = url_params.app_id;
        const public_key = url_params.public_key;
        const name = url_params.name;
        const description = url_params.description;
        const model_id = url_params.model_id;
        const training_id = url_params.training_id;
        const validation_id = url_params.validation_id;
        // perform query and send view
        const process_id = yield Database.table('processes').insert({'app_id': app_id, 'creator_key': public_key,
            'name': name, 'description': description, 'model_id': model_id, 'training_set_id': training_id, 'validation_set_id': validation_id});
        const result = {"id": process_id};
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the <id> of the created process */
    * DeleteItem(request, response) {
        const Database = use('Database');
        const process_id = request.param('id');
        const deleted_count = yield Database.table('processes').where('id', process_id).delete();
        const result = {"deleted_count": deleted_count};
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Renders the admin view  */
    * AdminView(request, response) {
        const Database = use('Database');
        const result = yield Database.select('*').from('processes').limit(request.param('max_results'));
        yield response.sendView('processes/admin_view', {
            title: 'Processes Admin - Singularity',
            header: 'Processes',
            description: 'Administrative View',
            collection: 'Processes',
            view: 'Admin',
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            data: result
        });
    }
    /** @desc Renders the edit view  */
    * UpdateView(request, response) {
        const Database = use('Database');
        const process_id = request.param('id');
        const result = yield Database.select('*').from('processes').where('id', process_id);
        yield response.sendView('processes/update_view', {
            title: 'Edit Process - Singularity',
            header: 'Process',
            description: 'Editing View',
            collection: 'Processes',
            view: 'Update : ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            process_id: result[0].id,
            data: result
        });
    }
    /** @desc Renders the create view  */
    * CreateView(request, response) {
        const Database = use('Database');
        yield response.sendView('processes/create_view', {
            title: 'Create Process - Singularity',
            header: 'Process',
            description: 'Creation View',
            collection: 'Processes',
            view: 'Create',
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator'
        });
    }
    /** @desc Renders the edit view  */
    * DetailView(request, response) {
        const Database = use('Database');
        const process_id = request.param('id');
        const result = yield Database.select('*').from('processes').where('id', process_id);
        yield response.sendView('processes/detail_view', {
            title: 'Process Details - Singularity',
            header: 'Process',
            description: 'Details and Status',
            collection: 'Processes',
            view: 'Details: ' + result[0].id + '.',
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            data: result
        });
    }
    /** @desc Renders the edit view  */
    * UserView(request, response) {
        const Database = use('Database');
        yield response.sendView('authentication/detail_view', {
            title: 'Dashboard - Singularity',
            header: 'Dashboard',
            description: 'Apps and Processes',
            collection: 'Authentication',
            view: 'Details: ',
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator'
        });
    }
}
module.exports = ProcessesDBController;
    