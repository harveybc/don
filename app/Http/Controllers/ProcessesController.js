'use strict';
/** @desc
 Processeses dummy controller for testing database, it uses static test data.
 */
class ProcessesController {
    * GetItemQuery(process_id) {
        const Database = use('Database');
        const result = yield Database.select('*').from('processes').where('id', process_id);
        return (result);
    }
    /** @desc Returns a list of processes */
    * GetList(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=4; const method=1;var AA = use('App/Http/Controllers/AuthorizationController'); var aa = new AA(); const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 
        // queries
        const Database = use('Database');
        const result = yield Database.select('*').from('processes').limit(request.param('max_results'));
        /** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        // Accounting layer (402 Error)
        var datetime = new Date(); Account(url_params.username, collection, method, datetime, request, result) 
        // end of AAA layers
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the the <id> process */
    * GetItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=4; const method=2;var AA = use('App/Http/Controllers/AuthorizationController'); var aa = new AA(); const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 
        // queries
        const Database = use('Database');
        const process_id = request.param('id');
        const result = yield Database.select('*').from('processes').where('id', process_id);
        // Accounting layer (402 Error)
        var datetime = new Date(); Account(url_params.username, collection, method, datetime, request, result) 
        // end of AAA layers
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(request, response) {
        // generate parameters for query
        const Database = use('Database');
        const url_params = request.get();
        const name = url_params.name;
        const description = url_params.description;
        const creator_key = url_params.public_key;
        const tags = url_params.tags;
        const app_id = url_params.app_id;
        const active = url_params.active;
        const desired_block_time = url_params.desired_block_time;
        const desired_block_size = url_params.desired_block_size;
        const block_time_control = url_params.block_time_control;
        const model_id = url_params.model_id;
        const training_set_id = url_params.training_id;
        const validation_set_id = url_params.validation_id;
        const difficulty = url_params.difficulty;
        const format = url_params.format;
        //@todo TODO: Perform data validation
        // https://adonisjs.com/docs/3.2/validator

        // perform query and send view
        const process_id = yield Database
                .table('processes')
                .insert({'name': name, 'description': description, 'creator_key': creator_key
                    , 'tags': tags, 'app_id': app_id, 'active': active, 'desired_block_time': desired_block_time
                    , 'desired_block_size': desired_block_size, 'block_time_control': block_time_control
                    , 'model_id': model_id, 'training_set_id': training_set_id
                    , 'validation_set_id': validation_set_id});
        const result = {"id": process_id};
        return (result);
    }
    /** @desc Returns the <id> of the created process */
    * CreateItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=4; const method=3;var AA = use('App/Http/Controllers/AuthorizationController'); var aa = new AA(); const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 
        // queries
        var resp;
        result = yield * this.createItemQuery(request, resp);
        // Accounting layer (402 Error)
        var datetime = new Date(); Account(url_params.username, collection, method, datetime, request, result) 
        // end of AAA layers
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * updateItemQuery(request, response) {
        // generate parameters for query
// TODO CORREGIR SQL DE UPDATE EN LUGAR DE CREATE
        const Database = use('Database');
        const url_params = request.get();
        const name = url_params.name;
        const description = url_params.description;
        const creator_key = url_params.public_key;
        const tags = url_params.tags;
        const app_id = url_params.app_id;
        const active = url_params.active;
        const desired_block_time = url_params.desired_block_time;
        const desired_block_size = url_params.desired_block_size;
        const block_time_control = url_params.block_time_control;
        const model_id = url_params.model_id;
        const training_set_id = url_params.training_id;
        const validation_set_id = url_params.validation_id;
        const difficulty = url_params.difficulty;
        const format = url_params.format;
        // perform query and send view
        const affected_rows = yield Database
                .table('processes')
                .where('id', request.param('id'))
                .update({'name': name, 'description': description, 'creator_key': creator_key
                    , 'tags': tags, 'app_id': app_id, 'active': active, 'desired_block_time': desired_block_time
                    , 'desired_block_size': desired_block_size, 'block_time_control': block_time_control
                    , 'model_id': model_id, 'training_set_id': training_set_id
                    , 'validation_set_id': validation_set_id});
        const result = {"affected_rows": affected_rows};
        return (result);
    }
    /** @desc Returns the <id> of the created process */
    * UpdateItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=4; const method=4;var AA = use('App/Http/Controllers/AuthorizationController'); var aa = new AA(); const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 
        // queries
        var resp;
        var 2result = yield * this.updateItemQuery(request, resp);
        // Accounting layer (402 Error)
        var datetime = new Date(); Account(url_params.username, collection, method, datetime, request, result) 
        // end of AAA layers
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the <id> of the created process */
    * DeleteItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=4; const method=5;var AA = use('App/Http/Controllers/AuthorizationController'); var aa = new AA(); const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 
        // queries
        const Database = use('Database');
        const process_id = request.param('id');
        const deleted_count = yield Database.table('processes').where('id', process_id).delete();
        const result = {"deleted_count": deleted_count};
        // Accounting layer (402 Error)
        var Ac = use('App/Http/Controllers/AccountingController'); var ac = new Ac(); var datetime = new Date(); const result_a=ac.Account(url_params.username, collection, method, datetime, request, result) 
        // end of AAA layers
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Renders the admin view  */
    * AdminView(request, response, error) {
        const Database = use('Database');
        const result = yield Database.select('*').from('processes').limit(request.input('max_results'));
        yield response.sendView('processes/admin_view', {
            title: 'Processes Admin - Singularity',
            header: 'Processes',
            description: 'Administrative View',
            collection: 'Processes',
            view: 'Admin',
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            error: error,
            data: result
        });
    }
    /** @desc Renders the edit view  */
    * UpdateView(request, response) {
        const process_id = request.param('id');
        // if GET PARAM redir=TRUE: llama método de update y redirecciona a admin
        if (request.input('redir') == 1) {
            var resp;

            // if response = Ok redirect to admin with ok message
            var testv = yield * this.updateItemQuery(request, resp);
            if (testv.affected_rows == 1) {
                yield * this.AdminView(request, response, 0);
            } else {
                // else redirect to admin with error message
                yield * this.AdminView(request, response, 1);
            }
        }
        // sino muestra vista
        else {
            const Database = use('Database');

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
    }
    /** @desc Renders the create view  */
    * CreateView(request, response) {
        // if GET PARAM redir=TRUE: llama método de update y redirecciona a admin
        if (request.input('redir') == 1) {
            var resp;

            // if response = Ok redirect to admin with ok message
            var testv = yield * this.createItemQuery(request, resp);
            if (testv.id >=0) {
                yield * this.AdminView(request, response, 0);
            } else {
                // else redirect to admin with error message
                yield * this.AdminView(request, response, 1);
            }
        }
        // sino muestra vista
        else {
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
            view: 'Details: ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            data: result,
            process_id:process_id
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
module.exports = ProcessesController;
    