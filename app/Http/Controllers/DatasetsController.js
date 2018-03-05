'use strict';
/** @desc
 Datasetss, collection #5
 */
class DatasetsController {
    /** @desc Returns a list of datasets registers*/
    * GetList(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result
        const Database = use('Database');
        const result = yield Database.select('*').from('datasets').limit(request.param('max_results'));

        // nd response
        // ** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the the <id> process */
    * GetItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 2;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result 
        const Database = use('Database');
        const dataset_hash = request.param('hash');
        const result = yield Database.select('*').from('datasets').where('id', dataset_hash);
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(request, response) {
        // generate parameters for query
        const Database = use('Database');
        var url_params = request.post();
        const user_name = url_params.user_name;
        const collection = url_params.collection;
        const method = url_params.method;
        const date = url_params.date;
        const parameters = url_params.parameters;
        const res = url_params.result;
        const dataset_hash = url_params.dataset_hash;
        const process_hash = url_params.process_hash;
        const created_by = url_params.username;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        // @todo TODO: Perform data validation in parameters https://adonisjs.com/docs/3.2/validator
        // perform query and send view
        // TODO FALTA DATASET CONTENTS Y DATASET HASH (TODO - ID Y HASH)
        // DATASET CONTENTS es una lista de los hashes de las transacciones registradas
        // es decir, los accounting de las transacciones donde dataset=NULL,
        // calcula el dataset_hash y hace UPDATE de este en los accounting de esta lista con su nuevo hash.
        // (el update genera un flooding).  
        var difficulty = url_params.difficulty
        // gets the current process for last dataset data
        var Process = use('App/Http/Controllers/ProcessesController');
        var process = new Process();
        const res = yield * process.GetLastDatasetMetadata();
        const threshold = process.threshold;
        const prev_hash = process.last_dataset_hash;
        const last_dataset_date = process.last_dataset_date;
        var difficulty = proces.last_dataset_difficulty;
        // calculate the new difficulty based on desired and actual dataset time
        if (dataset_time < desired_dataset_time) {
            difficulty = difficulty + threshold;
        }
        if (dataset_time > desired_dataset_time) {
            difficulty = difficulty - threshold;
        }
        // inicializa performance
        const performance = 0.0;
        if (typeof url_params.performance !== 'undefined') {
            // the variable is defined
            performance = url_params.performance;
            // @TODO: VERIFICA SI EL PERFORMANCE EVALUADO ES CORRECTO DENTRO DEL THRESHOLD +/- nodet_threshold
            //  verifica si el modo de PoW es 0 = OPoW 
            if ((process.dataset_time_control == 0) && (performance > (process.last_dataset_performance + difficulty))){
                // envía request de evaluación de los parametros reportados en el modelo del process
                // 
                // inicia timer para cada 3 segundos revisar si ya están los resultados.}
                // si los resultados son menores al performance - nodet_threshold aborts.
                return (false);
            }

        }
        // var_value
        const var_value = 0.0;
        if (typeof url_params.var_value !== 'undefined') {
            // the variable is defined
            var_value = url_params.var_value;
        }
        // position
        const position = 0;
        if (typeof url_params.position !== 'undefined') {
            // the variable is defined
            position = url_params.position;
        }
        // calcula dataset_time como el tiempo en segundos entre este creation date y el del último bloque en process 
        var date_old = new Date(last_dataset_date);
        var date_new = new Date(created_at);
        var timeDiff = Math.abs(date_new.getTime() - date_old.getTime());
        var dataset_time = Math.ceil(timeDiff / 1000);

        // calcula Dataset contents como los registros de accounting sin dataset_hash
        const Database = use('Database');
        var hash = "0000000000";
        // UPDATE en accounting con dataset_hash = 0000000000 (10 zeroes) como
        // marcador para que no se incluyan nuevas transacciones en el nuevo 
        // bloque mientras se crea este (lock), y con los marcados se calcula el hash
        const affected_rows = yield Database
                .table('accountings')
                .where({'dataset_hash': "", 'process_hash': process_hash})
                .update({"dataset_hash": "0000000000"});
        // obtiene contenido de bloque como las transacciones de accounting sin dataset_hash
        const contents = yield Database.select('username, process_hash, dataset_hash, collection, method, parameters, result,created_by, updated_by, created_at, updated_at').from('accountings').where({'dataset_hash': "0000000000", 'process_hash': process_hash});
        // calcula dataset_size (sizeof dataset_contents? o query?)
        var jsize = require('json-size');
        var dataset_size = jsize.jsonSize(contents);
        // calcula hash del proceso como el hash del registro en JSON.
        var sha256 = require('js-sha256');
        hash = sha256(JSON.stringify({"username": user_name, "process_hash": process_hash
            , "prev_hash": prev_hash
            , "difficulty": difficulty, "threshold": threshold, "dataset_time": dataset_time
            , "dataset_size": dataset_size, "performance": performance, "var_value": var_value
            , "position": position
            , 'created_by': created_by, 'updated_by': updated_by
            , 'created_at': created_at, 'updated_at': updated_at, "contents": contents}));
        const resq = yield Database
                .table('datasets')
                .insert({"username": user_name, "process_hash": process_hash
                    , "hash": hash, "prev_hash": prev_hash
                    , "difficulty": difficulty, "threshold": threshold, "dataset_time": dataset_time
                    , "dataset_size": dataset_size, "performance": performance, "var_value": var_value
                    , "position": position
                    , 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at, "contents": contents});
        // UPDATE en processes con los nuevos valores de sus campos generados desde el bloque
        const affected_rows = yield Database
                .table('processes')
                .where('process_hash', process_hash)
                .update({"performance": performance, "difficulty": difficulty
                    , "dataset_time": dataset_time, "dataset_size": dataset_time
                    , 'updated_by': updated_by, 'updated_at': updated_at});
        const result = {"affected_rows": affected_rows};
        const result = {"id": resq};
        return (result);
    }
    /** @desc Returns the <id> of the created process */
    * CreateItem(request, response) {
        var url_params = request.post();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 3;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and response
        var resp;
        var result = yield * this.createItemQuery(request, resp);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=datasets, 4=processes, 5=parameters, 6=datasets, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const account_res = yield * account.Account(collection, method, url_params, result);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }

    /** @desc Returns the <id> of the created process */
    * DeleteItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 5;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        //Queries and result
        const Database = use('Database');
        const process_hash = request.param('id');
        const deleted_count = yield Database.table('datasets').where('id', process_hash).delete();
        const result = {"deleted_count": deleted_count};
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=datasets, 4=processes, 5=parameters, 6=datasets, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const account_res = yield * account.Account(collection, method, url_params, result);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Renders the admin view  */
    * AdminView(request, response, error) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const result = yield Database.select('*').from('datasets').limit(request.input('max_results'));
        yield response.sendView('datasets/admin_view', {
            title: 'Datasets Admin - Singularity',
            process_hash: url_params.process_hash, header: 'Datasets',
            description: 'Administrative View',
            collection: 'Datasets',
            view: 'Admin',
            user_full_name: 'Harvey Bastidas',
            // @TODO: CAMBIAR EN TODAS LAS REQUESTS EL ROL del GUI user_role POR EL DE ACCOUNTINGS
            user_role: 'Administrator',
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            error: error,
            data: result
        });
    }
    /** @desc Renders the edit view  */
    * DetailView(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }

        const Database = use('Database');
        const user_id = request.param('id');
        const result = yield Database.select('*').from('datasets').where('id', user_id);
        yield response.sendView('datasets/detail_view', {
            title: 'Details - Singularity',
            process_hash: url_params.process_hash, header: 'Datasets',
            description: 'Details and Status',
            collection: 'Datasets',
            view: 'Details: ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            data: result,
            user_id: user_id
        });
    }
    /** @desc Renders the create view  */
    * CreateView(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }

        // if GET PARAM redir=TRUE: llama método de update y redirecciona a admin
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
            yield response.sendView('datasets/create_view', {
                title: 'Create - Singularity',
                process_hash: url_params.process_hash, header: 'Datasets',
                description: 'Creation View',
                collection: 'Datasets',
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
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }


        const process_hash = request.param('id');
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
            const result = yield Database.select('*').from('datasets').where('id', process_hash);
            yield response.sendView('datasets/update_view', {
                title: 'Edit - Singularity',
                process_hash: url_params.process_hash, header: 'Datasets',
                description: 'Editing View',
                collection: 'Datasets',
                view: 'Update : ' + result[0].id,
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                pass_hash: url_params.pass_hash,
                data: result,
                username: url_params.username
            });
        }
    }
}
module.exports = DatasetsController;
    