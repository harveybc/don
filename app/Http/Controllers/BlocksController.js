'use strict';
/** @desc
 Blockss, collection #5
 */
class BlocksController {
    /** @desc Returns a list of blocks registers*/
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
        const collection = 4;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result
        const Database = use('Database');
        const result = yield Database.select('*').from('blocks').limit(request.param('max_results'));

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
        const collection = 4;
        const method = 2;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result 
        const Database = use('Database');
        const block_hash = request.param('hash');
        const result = yield Database.select('*').from('blocks').where('id', block_hash);
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(url_params) {
        // generate parameters for query
        const user_name = url_params.user_name;
        const collection = url_params.collection;
        const method = url_params.method;
        const date = url_params.date;
        const parameters = url_params.parameters;
        const res1 = url_params.result;
        const block_hash = url_params.block_hash;
        const process_hash = url_params.process_hash;
        const created_by = url_params.username;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        // @todo TODO: Perform data validation in parameters https://adonisjs.com/docs/3.2/validator
        // perform query and send view
        // TODO FALTA BLOCK CONTENTS Y BLOCK HASH (TODO - ID Y HASH)
        // BLOCK CONTENTS es una lista de los hashes de las transacciones registradas
        // es decir, los accounting de las transacciones donde block=NULL,
        // calcula el block_hash y hace UPDATE de este en los accounting de esta lista con su nuevo hash.
        // (el update genera un flooding).  
        // gets the current process for last block data
        var Process = use('App/Http/Controllers/ProcessesController');
        var pr = new Process();
        const process = yield * pr.GetLastBlockMetadata(process_hash);
        const threshold = process.threshold;
        const prev_hash = process.last_block_hash;
        const last_block_date = process.last_block_date;
        var difficulty = process.last_block_difficulty;
        // calculate the new difficulty based on desired and actual block time
        if (block_time < process.desired_block_time) {
            difficulty = difficulty + threshold;
        }
        if (block_time > process.desired_block_time) {
            difficulty = difficulty - threshold;
        }
        // inicializa performance
        const performance = 0.0;
        if (typeof url_params.performance !== 'undefined') {
            // the variable is defined
            performance = url_params.performance;
            // @TODO: VERIFICA SI EL PERFORMANCE EVALUADO ES CORRECTO DENTRO DEL THRESHOLD +/- nodet_threshold
            //  verifica si el modo de PoW es 0 = OPoW 
            if ((process.block_time_control == 0) && (performance > (process.last_block_performance + difficulty))) {
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
        // calcula block_time como el tiempo en segundos entre este creation date y el del último bloque en process 
        var date_old = new Date(last_block_date);
        var date_new = new Date(created_at);
        var timeDiff = Math.abs(date_new.getTime() - date_old.getTime());
        var block_time = Math.ceil(timeDiff / 1000);

        // calcula Block contents como los registros de accounting sin block_hash
        const Database = use('Database');
        var hash = "0000000000";
        // UPDATE en accounting con block_hash = 0000000000 (10 zeroes) como
        // marcador para que no se incluyan nuevas transacciones en el nuevo 
        // bloque mientras se crea este (lock), y con los marcados se calcula el hash
        const affected_rows1 = yield Database
                .table('accountings')
                .where({'block_hash': "", 'process_hash': process_hash})
                .update({"block_hash": "0000000000"});
        // obtiene contenido de bloque como las transacciones de accounting sin block_hash
        const contents = yield Database.select('username, process_hash, block_hash, collection, method, parameters, result,created_by, updated_by, created_at, updated_at').from('accountings').where({'block_hash': "0000000000", 'process_hash': process_hash});
        // calcula block_size (sizeof block_contents? o query?)
        var jsonSize = require('json-size');
        var block_size = jsonSize(contents);
        // calcula hash del proceso como el hash del registro en JSON.
        var sha256 = require('js-sha256');
        hash = sha256(JSON.stringify({"username": user_name, "process_hash": process_hash
            , "prev_hash": prev_hash
            , "difficulty": difficulty, "threshold": threshold, "block_time": block_time
            , "block_size": block_size, "performance": performance, "var_value": var_value
            , "position": position
            , 'created_by': created_by, 'updated_by': updated_by
            , 'created_at': created_at, 'updated_at': updated_at, "contents": contents}));
        const resq = yield Database
                .table('blocks')
                .insert({"username": user_name, "process_hash": process_hash
                    , "hash": hash, "prev_hash": prev_hash
                    , "difficulty": difficulty, "threshold": threshold, "block_time": block_time
                    , "block_size": block_size, "performance": performance, "var_value": var_value
                    , "position": position
                    , 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at, "contents": contents});
        // UPDATE en processes con los nuevos valores de sus campos generados desde el bloque
        const affected_rows = yield Database
                .table('processes')
                .where('process_hash', process_hash)
                .update({"last_block_performance": performance, "last_block_difficulty": difficulty
                    , "last_block_time": block_time, "last_block_size": block_time
                    , 'updated_by': updated_by, 'updated_at': updated_at});
        const result1 = {"affected_rows": affected_rows};
        // resultado de inserción de bloque
        const result2 = {"id": process};
        return (result2);
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
        const collection = 4;
        const method = 3;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and response
        var resp;
        var result = yield * this.createItemQuery(url_params);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=blocks, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const date_d = new Date;
        const d = date_d.toISOString();
        var sha256 = require('js-sha256');
        var hash_p = sha256(JSON.stringify('' + collection + '' + method + '' + url_params + '' + d));
        const account_res = yield * account.Account(collection, method, d, url_params.username, JSON.stringify(url_params), JSON.stringify(result), hash_p, true);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /* Update sql query*/
    * updateItemQuery(url_params) {
        // generate parameters for query
        const user_name = url_params.user_name;
        const collection = url_params.collection;
        const method = url_params.method;
        const date = url_params.date;
        const parameters = url_params.parameters;
        const res1 = url_params.result;
        const block_hash = url_params.block_hash;
        const process_hash = url_params.process_hash;
        const created_by = url_params.username;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        // @todo TODO: Perform data validation in parameters https://adonisjs.com/docs/3.2/validator
        // perform query and send view
        // TODO FALTA BLOCK CONTENTS Y BLOCK HASH (TODO - ID Y HASH)
        // BLOCK CONTENTS es una lista de los hashes de las transacciones registradas
        // es decir, los accounting de las transacciones donde block=NULL,
        // calcula el block_hash y hace UPDATE de este en los accounting de esta lista con su nuevo hash.
        // (el update genera un flooding).  
        // gets the current process for last block data
        var Process = use('App/Http/Controllers/ProcessesController');
        var pr = new Process();
        const process = yield * pr.GetLastBlockMetadata(process_hash);
        const threshold = process.threshold;
        const prev_hash = process.last_block_hash;
        const last_block_date = process.last_block_date;
        var difficulty = process.last_block_difficulty;
        // calculate the new difficulty based on desired and actual block time
        if (block_time < process.desired_block_time) {
            difficulty = difficulty + threshold;
        }
        if (block_time > process.desired_block_time) {
            difficulty = difficulty - threshold;
        }
        // inicializa performance
        const performance = 0.0;
        if (typeof url_params.performance !== 'undefined') {
            // the variable is defined
            performance = url_params.performance;
            // @TODO: VERIFICA SI EL PERFORMANCE EVALUADO ES CORRECTO DENTRO DEL THRESHOLD +/- nodet_threshold
            //  verifica si el modo de PoW es 0 = OPoW 
            if ((process.block_time_control == 0) && (performance > (process.last_block_performance + difficulty))) {
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
        // calcula block_time como el tiempo en segundos entre este creation date y el del último bloque en process 
        var date_old = new Date(last_block_date);
        var date_new = new Date(created_at);
        var timeDiff = Math.abs(date_new.getTime() - date_old.getTime());
        var block_time = Math.ceil(timeDiff / 1000);
        const Database = use('Database');
        // perform query and send view
        const affected_rows = yield Database
                .table('blocks')
                .where('hash', url_params.param('id'))
                .update({
                    "username": user_name, "process_hash": process_hash
                    , "prev_hash": prev_hash
                    , "difficulty": 0, "threshold": threshold
                    , "block_time": block_time
                    , "performance": performance, "var_value": var_value
                    , "position": position
                    , 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at});
        const result = {"affected_rows": affected_rows};
        return (result);
    }

    /** @desc Returns the <id> of the created process */
    * UpdateItem(request, response) {
        var url_params = request.post();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 4;
        const method = 4;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result
        var resp;
        var result = yield * this.updateItemQuery(url_params);
        // Block layer
        // collections: 1=authent, 2=authoriz, 3=block, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Account = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const date_d = new Date;
        const d = date_d.toISOString();
        var sha256 = require('js-sha256');
        var hash_p = sha256(JSON.stringify('' + collection + '' + method + '' + url_params + '' + d));
        const account_res = yield * account.Account(collection, method, d, url_params.username, JSON.stringify(url_params), JSON.stringify(result), hash_p, true);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }

    /** @desc Returns the <id> of the created process */
    * deleteItemQuery(url_params) {
        const Database = use('Database');
        const process_hash = url_params.param('id');
        const deleted_count = yield Database.table('blocks').where('id', process_hash).delete();
        const result = {"deleted_count": deleted_count};
        return result;
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
        const collection = 4;
        const method = 5;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        //Queries and result
        var resp;
        var result = yield * this.deleteItemQuery(url_params);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=blocks, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const date_d = new Date;
        const d = date_d.toISOString();
        var sha256 = require('js-sha256');
        var hash_p = sha256(JSON.stringify('' + collection + '' + method + '' + url_params + '' + d));
        const account_res = yield * account.Account(collection, method, d, url_params.username, JSON.stringify(url_params), JSON.stringify(result), hash_p, true);
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
        const collection = 4;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const result = yield Database.select('*').from('blocks').limit(request.input('max_results'));
        yield response.sendView('blocks/admin_view', {
            title: 'Blocks Admin - Singularity',
            process_hash: url_params.process_hash, header: 'Blocks',
            description: 'Administrative View',
            collection: 'Blocks',
            view: 'Admin',
            user_full_name: 'Harvey Bastidas',
            // @TODO: CAMBIAR EN TODAS LAS REQUESTS EL ROL del GUI user_role POR EL DE ACCOUNTINGS
            user_role: 'Administrator',
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            error: error,
            data: result,
            items: [
                {attr: "id", title: "id", type: "number", width: 20},
                {attr: "process_hash", title: "proc", type: "text", width: 70},
                {attr: "difficulty", title: "diff", type: "number", width: 30},
                {attr: "block_time", title: "time", type: "number", width: 30},
                {attr: "created_at", title: "Created At", type: "text", width: 60}
            ]
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
        const collection = 4;
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
            yield response.sendView('blocks/create_view', {
                title: 'Create - Singularity',
                process_hash: url_params.process_hash, header: 'Blocks',
                description: 'Creation View',
                collection: 'Blocks',
                view: 'Create',
                user_full_name: 'Harvey Bastidas',
                username: url_params.username,
                pass_hash: url_params.pass_hash,
                user_role: 'Administrator',
                items: [

                    {attr: "process_hash", title: "proc", type: "text", width: 70},
                    {attr: "difficulty", title: "diff", type: "text", width: 30},
                    {attr: "block_time", title: "time", type: "text", width: 30},
                    {attr: "created_at", title: "Created At", type: "text", width: 60}
                ]
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
        const collection = 4;
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
            const result = yield Database.select('*').from('blocks').where('id', process_hash);
            yield response.sendView('blocks/update_view', {
                title: 'Edit - Singularity',
                process_hash: url_params.process_hash,
                header: 'Blocks',
                description: 'Editing View',
                collection: 'Blocks',
                view: 'Update : ' + result[0].id,
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                pass_hash: url_params.pass_hash,
                data: result,
                hash: result[0].hash,
                username: url_params.username,
                items: [
                    {attr: "process_hash", title: "proc", type: "text", width: 70},
                    {attr: "difficulty", title: "diff", type: "text", width: 30},
                    {attr: "block_time", title: "time", type: "text", width: 30},
                    {attr: "created_at", title: "Created At", type: "text", width: 60}
                ]
            });
        }
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
        const collection = 4;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }

        const Database = use('Database');
        const user_id = request.param('id');
        const result = yield Database.select('*').from('blocks').where('id', user_id);
        yield response.sendView('blocks/detail_view', {
            title: 'Details - Singularity',
            process_hash: url_params.process_hash, header: 'Blocks',
            description: 'Details and Status',
            collection: 'Blocks',
            view: 'Details: ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            data: result,
            user_id: user_id,
            items: [
                {attr: "process_hash", title: "proc", type: "text", width: 70},
                {attr: "difficulty", title: "diff", type: "text", width: 30},
                {attr: "block_time", title: "time", type: "text", width: 30},
                {attr: "created_at", title: "Created At", type: "text", width: 60}
            ]
        });
    }
}
module.exports = BlocksController;
    