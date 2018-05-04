'use strict';
/** @desc
 Parameterss, collection #5
 */
class ParametersController {
    /** @desc saves the username, collection, method, date, parameters and result (string) */
    * GetConditionVariables(process_hash, performance, param_id, date, user) {
        const Database = use('Database');
        var result = yield Database.select('*').from('processes').where('hash', process_hash).limit(1);
        // opowdet: Read last_block_time,block-time, block_time_control,Perf_last_block, 
        //   current_block_perf, last_block_threshold, last_block_ from processes collection
        // calcula block_time como el tiempo en segundos entre este creation date y el del último bloque en process 
        var date_old = new Date(result[0].last_block_date);
        var date_new = new Date(date);
        var timeDiff = Math.abs(date_new.getTime() - date_old.getTime());
        var block_time = Math.ceil(timeDiff / 1000);
        console.log("\nprocess_result=", result);
        // FALTA, si perf> current_perf, actualizar process y FLOOD
        if (performance > parseFloat(result[0].current_block_performance)) {
            // actualiza con flood en processes current_block_performance, current block_time, last_optimum_hash,last_optimum_date, updated_by, updated_At
            result[0].current_block_performance = performance;
            result[0].current_block_time = block_time;
            result[0].last_optimum_id = param_id;
            result[0].last_optimum_date = date;
            result[0].updated_by = user;
            result[0].updated_at = date;
            var Proceso = use('App/Http/Controllers/ProcessesController');
            var proceso = new Proceso();
            var res2 = yield * proceso.updateItemQuery(result[0], result[0].id);
            console.log("\nres2=", res2);
            // lee el nuevo registro de procesos en result para calcular las variables de new block.
            //result = yield Database.select('*').from('processes').where('hash', process_hash).limit(1);
        }

        var c_vars = {last_block_time: parseInt(result[0].last_block_time), block_time: parseInt(block_time),
            process_hash: result[0].hash, 
            block_time_control: parseInt(result[0].block_time_control), last_block_performance: parseFloat(result[0].last_block_performance),
            current_block_performance: parseFloat(result[0].current_block_performance), current_threshold: parseFloat(result[0].current_threshold),
            last_threshold: parseFloat(result[0].last_threshold), desired_block_time: parseFloat(result[0].desired_block_time)
        };
        return c_vars;
    }

    /** @desc Verifies if the block creation conditions are met
     * 
     * @param {type} request
     * @param {type} response
     * @returns {Generator}
     */
    * verifyBlockConditions(process_hash, performance, param_id, param_hash, date, user) {
        // retrieve the variables for block generation conditions
        var c_vars = yield * this.GetConditionVariables(process_hash, performance, param_id, date, user);
        // if the block generation conditions are met, create a new block,set the new block_hash and flood the new block.
        // the conditions are: (c_vars.current_block_performance > (c_vars.last_block_performance + c_vars.current_thresold)
        var cond = false;
        // ic collection=parameters and method=create
        console.log("\nc_vars.block_time_control=", c_vars.block_time_control,
                " c_vars.current_block_performance=", c_vars.current_block_performance, " c_vars.last_block_performance=", c_vars.last_block_performance, " c_vars.current_threshold=", c_vars.current_threshold);
        // If block time control method is OPoW (det-model) and Performance>Perf_anterior_bloque+Last_block_threshold
        if ((c_vars.block_time_control === 0) && (c_vars.current_block_performance > (c_vars.last_block_performance + c_vars.current_threshold)))
            cond = true;
        if (cond) {
            // consulta campos para nuevo bloque
            const Database = use('Database');
            var prev_hash = yield Database.select('hash').from('blocks').where('process_hash', process_hash).orderBy('id', 'desc').limit(1);
            // lee los registros marcados para usar como contents
            var contents = yield Database.select('hash').from('accountings').where('block_hash', "");
            // verifica si el block_time es mayor al desired, y ajusta nuevo threshold
            if (c_vars.block_time > c_vars.desired_block_time){
                c_vars.current_threshold=c_vars.current_threshold*0.3                
            }
            else{
                c_vars.current_threshold=c_vars.current_threshold*1.2                
            }
                
            // compone la estructura url_params usada en creación de bloque
            var url_params = {
                username: user,
                process_hash: c_vars.process_hash,
                hash: "", //Inicializado con el hash del bloque al final
                prev_hash: prev_hash[0].hash,
                param_hash: param_hash,
                contents: contents,
                threshold: c_vars.current_threshold,
                block_time: c_vars.block_time,
                block_size: contents.length,
                performance: performance,
                rejects: 0,
                created_by: user,
                created_at: date
            };
            var sha256 = require('js-sha256');
            url_params.hash = sha256(JSON.stringify(url_params));
            console.log('\nurl_params', url_params);
            // crea nuevo bloque
            var Block = use('App/Http/Controllers/BlocksController');
            var block = new Block;
            var result = yield * block.createItemQuery(url_params); // the new item includes a list of all accounting register hashes that were null +prev_block_hash and final hash
            // Hace nuevo accounting de block creation y flood
            var Accounting = use('App/Http/Controllers/AccountingController');
            var account = new Accounting();
            const date_d = new Date;
            const d = date_d.toISOString();
            var sha256 = require('js-sha256');
            var collection = 4;// blocks
            var method = 3; // blockCreation method
            var hash_p = sha256(JSON.stringify('' + collection + '' + method + '' + url_params + '' + d));
            const account_res = yield * account.Account(collection, method, d, url_params.username, JSON.stringify(url_params), JSON.stringify(result), hash_p, true, 0);
            if (!account_res) {
                return {result: {"error": account_res, "code": 402}, request_id: 3};
            }
// TODO: Actualiza process: Calcula el próximo threshold basado en el tiempo de bloque actual, el deseado y el último threshold, flood
            if (!result) {
                return {"error": "No se generó bloque cpn block.generateBlock", "code": 433};
            } else {
                return result;
            }

        } else {
            return {"error": "No se cumplieron las condiciones de creación de bloque", "code": 435};
        }
    }
    /** @desc Returns a list of parameters registers*/
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
        const collection = 8;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result
        const Database = use('Database');
        const result = yield Database.select('*').from('parameters').limit(request.param('max_results'));
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
        const collection = 8;
        const method = 2;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result 
        const Database = use('Database');
        const parameter_hash = request.param('hash');
        const parameter_id = request.param('id');
        const result = yield Database.select('*').from('parameters').where('id', parameter_id);
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    
    * createItemQuery(url_params,hash) {
        // assign variables to url parameters
        const process_hash = url_params.process_hash;
        const app_hash = url_params.app_hash;
        const parameter_link = url_params.parameter_link;
        const parameter_text = url_params.parameter_text;
        const parameter_blob = url_params.parameter_blob;
        const validation_hash = url_params.validation_hash;
        const performance = url_params.performance;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        // @todo TODO: Perform data validation in parameters https://adonisjs.com/docs/3.2/validator
        const Database = use('Database');
        const resq =
                yield Database
                .table('parameters')
                .insert({
                    "process_hash": process_hash
                    , "app_hash": app_hash
                    , "parameter_link": parameter_link
                    , "parameter_text": parameter_text
                    , "parameter_blob": parameter_blob
                    , "validation_hash": validation_hash
                    , "hash": hash
                    , "performance": performance
                    , 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at});
        // Verify block creation conditions
        console.log("\nResultCreateItemQuery=", resq);
        // resultado de inserción de bloque
       
        return ({"id": [resq,hash]});
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
        const collection = 8;
        const method = 3;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 4});
        }
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=parameters, 4=processes, 5=parameters, 6=parameters, 7=network */
        // 
// Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const date_d = new Date;
        const d = date_d.toISOString();
        var result = {};
        var sha256 = require('js-sha256');
        var hash_p = sha256(JSON.stringify('' + collection + '' + method + '' + url_params + '' + d));
        const account_res = yield * account.Account(collection, method, d, url_params.username, JSON.stringify(url_params), JSON.stringify(result), hash_p, true, request.param('id'));
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // Queries and response DESPUES DE ACCT para que se incluya la transacción de creación de param en el bloque
       result = yield * this.createItemQuery(url_params,hash_p);
       // Verify block creation conditions at the end so it can call block creation from this same machine
       console.log("\nresult_createItemQuery=",result);
       var resp = yield * this.verifyBlockConditions(url_params.process_hash, parseFloat(url_params.performance), result.id[0], result.id[1], d, url_params.username);
       // send response
       yield response.sendView('master_JSON', {result: resp, request_id: 3112});
    }
    /* Update sql query*/
    * updateItemQuery(url_params, id) {
        // generate parameters for query
        const process_hash = url_params.process_hash;
        const app_hash = url_params.app_hash;
        const parameter_link = url_params.parameter_link;
        const parameter_text = url_params.parameter_text;
        const parameter_blob = url_params.parameter_blob;
        const validation_hash = url_params.validation_hash;
        const hash = url_params.hash;
        const performance = url_params.performance;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        const Database = use('Database');
        // perform query and send view
        const affected_rows = yield Database
                .table('parameters')
                .where('id', id)
                .update({
                    "process_hash": process_hash
                    , "app_hash": app_hash
                    , "parameter_link": parameter_link
                    , "parameter_text": parameter_text
                    , "parameter_blob": parameter_blob
                    , "validation_hash": validation_hash
                    , "hash": hash
                    , "performance": performance
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
        const collection = 8;
        const method = 4;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result
        var resp;
        var result = yield * this.updateItemQuery(url_params, request.param('id'));
        // Parameter layer
        // collections: 1=authent, 2=authoriz, 3=parameter, 4=processes, 5=parameters, 6=parameters, 7=network */
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

    /** @desc Returns the <id> of the created process */
    * deleteItemQuery(url_params, id) {
        const Database = use('Database');
        const process_hash = id;
        const deleted_count = yield Database.table('parameters').where('id', process_hash).delete();
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
        const collection = 8;
        const method = 5;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        //Queries and result
        var resp;
        var result = yield * this.deleteItemQuery(url_params, request.param('id'));
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=parameters, 4=processes, 5=parameters, 6=parameters, 7=network */
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
        const collection = 8;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const result = yield Database.select('*').from('parameters').limit(request.input('max_results'));
        yield response.sendView('parameters/admin_view', {
            title: 'Parameters Admin - Singularity',
            process_hash: url_params.process_hash, header: 'Parameters',
            description: 'Administrative View',
            collection: 'Parameters',
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
                {attr: "performance", title: "performance", type: "text", width: 30},
                {attr: "parameter_text", title: "parameter_text", type: "text", width: 30},
                {attr: "parameter_link", title: "parameter_link", type: "text", width: 30}

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
        const collection = 8;
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
            yield response.sendView('parameters/create_view', {
                title: 'Create - Singularity',
                process_hash: url_params.process_hash, header: 'Parameters',
                description: 'Creation View',
                collection: 'Parameters',
                view: 'Create',
                user_full_name: 'Harvey Bastidas',
                username: url_params.username,
                pass_hash: url_params.pass_hash,
                user_role: 'Administrator',
                items: [
                    {attr: "process_hash", title: "process_hash", type: "text", width: 30},
                    {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                    {attr: "parameter_link", title: "parameter_link", type: "text", width: 30},
                    {attr: "parameter_text", title: "parameter_text", type: "text", width: 30},
                    {attr: "parameter_blob", title: "parameter_blob", type: "text", width: 30},
                    {attr: "validation_hash", title: "validation_hash", type: "text", width: 30},
                    {attr: "hash", title: "hash", type: "text", width: 30},
                    {attr: "performance", title: "performance", type: "text", width: 30}

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
        const collection = 8;
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
            const result = yield Database.select('*').from('parameters').where('id', process_hash);
            yield response.sendView('parameters/update_view', {
                title: 'Edit - Singularity',
                process_hash: url_params.process_hash,
                header: 'Parameters',
                description: 'Editing View',
                collection: 'Parameters',
                view: 'Update : ' + result[0].id,
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                pass_hash: url_params.pass_hash,
                data: result,
                hash: result[0].id,
                username: url_params.username,
                items: [
                    {attr: "process_hash", title: "process_hash", type: "text", width: 30},
                    {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                    {attr: "parameter_link", title: "parameter_link", type: "text", width: 30},
                    {attr: "parameter_text", title: "parameter_text", type: "text", width: 30},
                    {attr: "parameter_blob", title: "parameter_blob", type: "text", width: 30},
                    {attr: "validation_hash", title: "validation_hash", type: "text", width: 30},
                    {attr: "hash", title: "hash", type: "text", width: 30},
                    {attr: "performance", title: "performance", type: "text", width: 30}

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
        const collection = 8;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const user_id = request.param('id');
        const result = yield Database.select('*').from('parameters').where('id', user_id);
        yield response.sendView('parameters/detail_view', {
            title: 'Details - Singularity',
            process_hash: url_params.process_hash, header: 'Parameters',
            description: 'Details and Status',
            collection: 'Parameters',
            view: 'Details: ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            data: result,
            user_id: user_id,
            items: [
                {attr: "process_hash", title: "process_hash", type: "text", width: 30},
                {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                {attr: "parameter_link", title: "parameter_link", type: "text", width: 30},
                {attr: "parameter_text", title: "parameter_text", type: "text", width: 30},
                {attr: "parameter_blob", title: "parameter_blob", type: "text", width: 30},
                {attr: "validation_hash", title: "validation_hash", type: "text", width: 30},
                {attr: "hash", title: "hash", type: "text", width: 30},
                {attr: "performance", title: "performance", type: "text", width: 30}

            ]
        });
    }
}
module.exports = ParametersController;
    