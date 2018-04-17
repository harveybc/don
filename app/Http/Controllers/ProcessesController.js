'use strict';
/** @desc
 Processeses dummy controller for testing database, it uses static test data.
 */
class ProcessesController {
    * GetLastBlockMetadata(process_hash) {
        const Database = use('Database');
        const result = yield Database.select('*').from('processes').where('hash', process_hash).limit(1);
        if (typeof result[0] !== 'undefined') {
            // the variable is defined
            return (result[0]);
        } else
        {
            return(0);
        }
    }

    * GetItemQuery(process_hash) {
        const Database = use('Database');
        const result = yield Database.select('*').from('processes').where('id', process_hash);
        return (result);
    }
    /** @desc Returns a list of processes */
    * GetList(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 11;
        const method = 1;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // queries
        const Database = use('Database');
        const result = yield Database.select('*').from('processes').limit(request.param('max_results'));
        /** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        // Accounting layer (402 Error)
        var datetime = new Date();
        Account(url_params.username, collection, method, datetime, request, result)
        // end of AAA layers
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the the <id> process */
    * GetItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 11;
        const method = 2;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // queries
        const Database = use('Database');
        const process_hash = request.param('id');
        const result = yield Database.select('*').from('processes').where('hash', process_hash);
        // Accounting layer (402 Error)
        var datetime = new Date();
        Account(url_params.username, collection, method, datetime, request, result)
        // end of AAA layers
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(url_params) {
        // generate parameters for query
        const Database = use('Database');
        const name = url_params.name;
        const description = url_params.description;
        const creator_key = url_params.public_key;
        const tags = url_params.tags;
        const app_hash = url_params.app_hash;
        const active = url_params.active;
        const desired_block_time = url_params.desired_block_time;
        const desired_block_size = url_params.desired_block_size;
        const block_time_control = url_params.block_time_control;
        const model_id = url_params.model_id;
        const training_set_id = url_params.training_id;
        const validation_set_id = url_params.validation_id;
        const difficulty = url_params.difficulty;
        const format = url_params.format;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        //@todo TODO: Perform data validation
        // https://adonisjs.com/docs/3.2/validator
        // Calcula hash del proceso como el hash del registro en JSON.
        var sha256 = require('js-sha256');
        var hash = sha256(JSON.stringify(url_params));
        // perform query and send view
        const process_id = yield Database
                .table('processes')
                .insert({'name': name, 'description': description, 'creator_key': creator_key, 'hash': hash
                    , 'tags': tags, 'app_hash': app_hash, 'active': active, 'desired_block_time': desired_block_time
                    , 'desired_block_size': desired_block_size, 'block_time_control': block_time_control
                    , 'model_id': model_id, 'training_set_id': training_set_id
                    , 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at
                    , 'validation_set_id': validation_set_id});
        const result = {"id": process_id};
        return (result);
    }
    /** @desc Returns the <id> of the created process */
    * CreateItem(request, response) {
        var url_params = request.post();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 11;
        const method = 3;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // queries
        var resp;
        var result = yield * this.createItemQuery(url_params);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=accounting, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const date_d = new Date;
        const d = date_d.toISOString();
        var sha256 = require('js-sha256');
        var hash_p = sha256(JSON.stringify('' + collection + '' + method + '' + url_params + '' + d));
        const account_res = yield * account.Account(collection, method, d, url_params.username, JSON.stringify(url_params), JSON.stringify(result), hash_p, true, request.param('id'));
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * updateItemQuery(url_params,id) {
        // generate parameters for query
        console.log("\nURL_PARAMS_",url_params);
        const Database = use('Database');
        const name = url_params.name;
        const description = url_params.description;
        const creator_key = url_params.public_key;
        const created_by = creator_key;
        const tags = url_params.tags;
        const app_hash = url_params.app_hash;
        const active = url_params.active;
        const desired_block_time = url_params.desired_block_time;
        const desired_block_size = url_params.desired_block_size;
        const block_time_control = url_params.block_time_control;
        const model_id = url_params.model_id;
        const training_set_id = url_params.training_id;
        const validation_set_id = url_params.validation_id;
        const difficulty = url_params.difficulty;
        const format = url_params.format;
        const updated_by = url_params.username;
        const updated_at_d = new Date;
        const updated_at = updated_at_d.toISOString();
        // Calcula hash del proceso como el hash del registro en JSON.
        var sha256 = require('js-sha256');
        // TODO: QUITAR Y CALCULAR EL HASH
        // var hash = sha256(JSON.stringify(url_params));
        var hash = url_params.hash;
        // perform query and send view
        const affected_rows = yield Database
                .table('processes')
                .where('id', id)
                .update({'name': name, 'description': description, 'creator_key': creator_key, 'hash': hash
                    , 'tags': tags, 'app_hash': app_hash, 'active': active, 'desired_block_time': desired_block_time
                    , 'desired_block_size': desired_block_size, 'block_time_control': block_time_control
                    , 'model_id': model_id, 'training_set_id': training_set_id
                    , 'created_by': created_by, 'updated_by': updated_by
                    , 'updated_at': updated_at, 'validation_set_id': validation_set_id});
        const result = {"affected_rows": affected_rows};
        return (result);
    }
    /** @desc Returns the <id> of the created process */
    * UpdateItem(request, response) {
        var url_params = request.post();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 11;
        const method = 4;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // queries
        var resp;
        var result = yield * this.updateItemQuery(url_params,request.param('id'));
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=accounting, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const date_d = new Date;
        const d = date_d.toISOString();
        var sha256 = require('js-sha256');
        var hash_p = sha256(JSON.stringify('' + collection + '' + method + '' + url_params + '' + d));
        const account_res = yield * account.Account(collection, method, d, url_params.username, JSON.stringify(url_params), JSON.stringify(result), hash_p, true,request.param('id') );
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }

    /** @desc Returns the <id> of the created process */
    * deleteItemQuery(url_params,id) {
        const Database = use('Database');
        const process_hash = id;
        const deleted_count = yield Database.table('processes').where('id', process_hash).delete();
        const result = {"deleted_count": deleted_count};
        return result;
    }

    /** @desc Returns the <id> of the created process */
    * DeleteItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 11;
        const method = 5;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // queries
        var resp;
        var result = yield * this.deleteItemQuery(url_params,request.param('id'));
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=accounting, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const date_d = new Date;
        const d = date_d.toISOString();
        var sha256 = require('js-sha256');
        var hash_p = sha256(JSON.stringify('' + collection + '' + method + '' + url_params + '' + d));
        const account_res = yield * account.Account(collection, method, d, url_params.username, JSON.stringify(url_params), JSON.stringify(result), hash_p, true, request.param('id'));
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        var Ac = use('App/Http/Controllers/AccountingController');
        var ac = new Ac();
        var datetime = new Date();
        const result_a = ac.Account(url_params.username, collection, method, datetime, request, result)
        // end of AAA layers
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Renders the admin view  */
    * AdminView(request, response, error) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 11;
        const method = 1;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // queries
        const Database = use('Database');
        const result = yield Database.select('*').from('processes').limit(request.input('max_results'));
        yield response.sendView('processes/admin_view', {
            title: 'Processes Admin - Singularity',
            process_hash: url_params.process_hash, header: 'Processes',
            description: 'Administrative View',
            collection: 'Processes',
            view: 'Admin',
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            error: error,
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            data: result
        });
    }
    /** @desc Renders the edit view  */
    * DetailView(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 11;
        const method = 2;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // queries

        const Database = use('Database');
        const pid = request.param('id');
        const result = yield Database.select('*').from('processes').where('id', pid);
        yield response.sendView('processes/detail_view', {
            title: 'Process Details - Singularity',
            process_hash: url_params.process_hash, header: 'Process',
            description: 'Details and Status',
            collection: 'Processes',
            view: 'Details: ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            data: result,
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            pid: pid
        });
    }
    /** @desc Renders the edit view  */
    * UserView(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 11;
        const method = 2;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // queries
        const Database = use('Database');
        yield response.sendView('authentication/detail_view', {
            title: 'Dashboard - Singularity',
            process_hash: url_params.process_hash, header: 'Dashboard',
            description: 'Apps and Processes',
            collection: 'Authentication',
            view: 'Details: ',
            user_full_name: 'Harvey Bastidas',
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            user_role: 'Administrator'
        });
    }
    /** @desc Renders the create view  */
    * CreateView(request, response) {
        // if GET PARAM redir=TRUE: llama método de update y redirecciona a admin
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 11;
        const method = 3;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // queries
        if (request.input('redir') == 1) {
            var resp;

            // if response = Ok redirect to admin with ok message
            var testv = yield * this.createItemQuery(request, resp);
            if (testv.id >= 0) {
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
                process_hash: url_params.process_hash, header: 'Process',
                description: 'Creation View',
                collection: 'Processes',
                view: 'Create',
                user_full_name: 'Harvey Bastidas',
                username: url_params.username,
                pass_hash: url_params.pass_hash,
                user_role: 'Administrator'
            });
        }
    }
    /** @desc Renders the edit view  */
    * UpdateView(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 11;
        const method = 4;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // queries
        const pid = request.param('id');
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

            const result = yield Database.select('*').from('processes').where('id', pid);
            yield response.sendView('processes/update_view', {
                title: 'Edit Process - Singularity',
                process_hash: url_params.process_hash, header: 'Process',
                description: 'Editing View',
                collection: 'Processes',
                view: 'Update : ' + result[0].id,
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                pid: result[0].id,
                username: url_params.username,
                pass_hash: url_params.pass_hash,
                data: result

            });
        }
    }

}
module.exports = ProcessesController;
    