'use strict';
/** @desc
 Accountings, collection 1
 */
// @TODO: ADICIONAR lista de métodos a hacer accounting
// @TODO: ADICIONAR nueva colección de transacciones en variables con inputs y outputs
class AccountingController {
    /** @desc saves the username, collection, method, date, parameters and result (string) */
    * GetConditionVariables(process_hash) {
        var Autho = use('App/Http/Controllers/AccountingController');
        var autho = new Autho();
        // ERROR
        const acc_res_2 = yield * aa.GetItemQuery(url_params.username, collection, method);
        return (acc_res_2);
        // opowdet: Read last_block_time,block-time, control method,Perf_last_block, 
        //   current_block_perf, last_block_threshold, last_block_ from processes collection
        // opownod: nodet_threshold, 
        // cpow: last_block_difficulty,
        // detsize: desired_size, cada nodo tiene un turno
        // nd-size: desired_size, prob de bloque proporcional a size
        // dettime: desired_time, cada nodo tiene turno
        // nd-time: desired_time, prob de bloque proporcional a time&size
        // det anyvariable: desired_time, cada nodo tiene turno
        // nd anyvariable: desired_time, prob de bloque proporcional a time&size
    }
    // Flood: this method is called from the method flooding
    * flood(c, m, d, username, parameters_raw, result_raw, hash, TTL) {
        // Al recibir un request de FLOOD, se Decrementa el TTL, verifica TTL > 0  
        var new_ttl = TTL - 1;
        if (new_ttl < 1) {
            return 0;
        }
        // verifica si el request ya había sido hecho antes(busca hash en colección accounting).
        const Database = use('Database');
        const num_found = yield Database.select('count(*)').from('accountings').where('hash', hash);
        // busca el hash en la colección accounting 
        if (num_found > 0) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403, "description": "already_received"}, request_id: 7});
        }
        // consulta max_connections de la colección autentication
        const max_connections = yield Database.select('max_connection').from('authentications').where('username', username).limit(1);
        // selecciona los max_connection neighs             
        const result = yield Database.select('*').from('neighbors').orderBy('RAND()').limit(max_connections);
        // TODO: Implementar otros métodos de selección de neighbors
        // Envía request de FLOOD   a neighs
        var num_neighs = result.lenght;
        const request = require('request'); // Adonis request method
        var formData = {c: c, m: m, d: d, username: username, parameters_raw: parameters_raw, result_raw: result_raw, hash: hash, TTL: TTL};
        for (var i = 0; i < num_neighs; i++) {
            request.post(result[i].address + '/flooding', {form: formData},
                    function (error, response, body) {
                        console.log('error:', error); // Print the error if one occurred
                        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                        console.log('body:', body); // Print the HTML 
                    }
            );
        }
        var res = {url:result[i].address + '/flooding',form: formData}
        return res;
    }
    // Flooding: this method is called from the route /flooding and does AAA
    * Flooding(request, response) {
        var url_params = request.post();
        // c, m, d, username, parameters_raw, result_raw, hash, TTL, 
        const c = url_params.c;
        const m = url_params.m;
        const d = url_params.d;
        const username = url_params.username;
        const parameters_raw = url_params.parameters_raw;
        const result_raw = url_params.result_raw;
        const hash = url_params.hash;
        const TTL = url_params.TTL;
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 7});
        }
        // Authorization layer (403 Error)  TODO: CORREGIR
        const collection = c;
        const method = m;
/*        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403, "username":url_params.username, "process_hash":url_params.process_hash}, request_id: 9});
        }
        
        */
        // Flooding
        var result = yield * this.flood(c, m, d, username, parameters_raw, result_raw, hash, TTL, request, response);
        // Adiciona el registro de accounting original 
        const account_res = yield * this.Account(collection, method, d, username, parameters_raw, result, false);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 10});
        }

        // Ejecuta el collection/method/params localmente SIN nuevo accounting ni flooding.
        if (c === 1) { // collection 1 : Authentication
            var A = use('App/Http/Controllers/AuthenticationController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(parameters_raw);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 8});
                }
            }
/*            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            */
        }
/*        if (c === 2) { // collection 2 : Authorization
            var A = use('App/Http/Controllers/AuthorizationController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
        }
        if (c === 3) { // collection 3 : Accounting
            var A = use('App/Http/Controllers/AccountingController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
        }
        if (c === 4) { // collection 4 : Blocks
            var A = use('App/Http/Controllers/BlocksController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
        }
        if (c === 5) { // collection 5 : Datasets
            var A = use('App/Http/Controllers/DatasetsController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
        }
        if (c === 6) { // collection 6 : Evaluations
            var A = use('App/Http/Controllers/EvaluationsController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
        }
        if (c === 7) { // collection 7 : Models
            var A = use('App/Http/Controllers/ModelsController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
        }
        if (c === 8) { // collection 8 : Parameters
            var A = use('App/Http/Controllers/ParametersController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
        }
        if (c === 9) { // collection 9 : Neighbors
            var A = use('App/Http/Controllers/NeighborsController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
        }
        if (c === 10) { // collection 10 : Applications
            var A = use('App/Http/Controllers/ApplicationsController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
        }
        if (c === 11) { // collection 10 : Processes
            var A = use('App/Http/Controllers/ProcessesController');
            var a = new A();
            if (m === 3) { // method: create
                const auth_res = yield * a.createItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 4) { // method: update
                const auth_res = yield * a.updateItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
            if (m === 5) { // method: delete
                const auth_res = yield * a.deleteItemQuery(request, response);
                if (!auth_res) {
                    yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 400}, request_id: 7});
                }
            }
        }
        */
        return result;
    }

    /** @desc saves the username, collection, method, date, parameters, result, process_hash, (string) 
     * if the block creation method is OPoW verify block conditions only on collection=parameters,
     * method=create, 
     * collections: 1=authent, 2=authoriz, 3=accounting, 4=blocks, 5=datasets, 6=evaluations, 7=inputs, 8=models, 9=parameters, 10=processes*/
    * Account(c, m, d, username, url_params_mod, result_raw, do_flood) {
        // calcula el hash del relultado
        var sha256 = require('js-sha256');
        var r = sha256(JSON.stringify(result_raw));
        // convierte a string los parámetros sin el pass_hash
        var p = JSON.stringify(url_params_mod);
        // genera hash de la transacción
        var hash_p = sha256(JSON.stringify('' + c + '' + m + '' + url_params_mod + '' + r));
        // inicializa variables ret y result(de esta cunfión).
        var ret = false;
        var result;
        // @TODO: set the block of the regiser to the last one in blocks collection
        var block_hash = 0;
        // retrieve the variables for block generation conditions
        var c_vars = this.GetConditionVariables(url_params_mod.process_hash);
        //TODO: TEST CONDITONS? 
        //TODO: EXTRAER DE PARAMETERS EL  process_hash 
        // if the block generation conditions are met, create a new block,set the new block_hash and flood the new block.
        // the conditions are:
        var cond = false;
        // ic collection=parameters and method=create
        if ((c === 8) && (m === 3)) {
            // If block time control method is OPoW (det-model) and Performance>Perf_anterior_bloque+Last_block_threshold
            if ((c_vars.block_time_control === 0) && (c_vars.performance > (c_vars.last_block_performance + c_vars.last_thresold)))
                cond = true;
            // If block time control method is OPoW (non-det-model? incluir un segundo threshold para verificación) and Performance>Perf_anterior_bloque+Last_block_threshold
            if ((c_vars.block_time_control === 1) &&
                    (c_vars.performance > (c_vars.last_block_performance + c_vars.last_thresold - c_vars.nodet_thresold)))
                cond = true;
            // If block time control method is CPoW(bitcoin) and CryptoPuzzleSolved.difficulty(NumZeroes)>=last_block_difficulty
            // @TODO LAST: Función VerifyHashPoW() que retorna true si el hash del bloque(JSON) tiene <difficulty> zeros
            // iniciales y coincide
        }
        /* if ((c.block_time_control==2)&&(VerifyHashPoW(c.hash,c.blockJSON,c.difficulty))) cond=true;
         // If block time control method is deterministic size, turn is fixed per node, (TODO: if not generated(node dont reply), use next turn)
         if ((c.block_time_control==3)&&(VerifySizeTurn(c.block_size, c.desired_block_size, c.turn))) cond=true;
         // If block time control method is non-deterministic size (SOLO FLOOD FORWARD LARGEST BLOCK, 
         // LARGEST RAND/BLOCKS since LAST GENERATED BY this node) The rand is generated on receiver of forward
         if ((c.block_time_control==4)&&(VerifySizeRand(c.block_size, c.desired_block_size))) cond=true;
         // If block time control method is deterministic time
         if ((c.block_time_control==5)&&(VerifyTimeTurn(c.block_size, c.desired_block_size, c.turn))) cond=true;
         // If block time control method is non-deterministic time
         if ((c.block_time_control==6)&&(VerifyTimeRand(c.block_size, c.desired_block_size, c.turn))) cond=true;   
         // If block time control method is a variable's value, with deterministic turn
         if ((c.block_time_control==7)&&(VerifyVariableTurn(c.var_value, c.var_last_value, c.var_last_threshold))) cond=true;
         // If block time control method is non-deterministic time
         if ((c.block_time_control==8)&&(VerifyVariableRand(c.var_value, c.var_last_value, c.var_last_threshold, c.var_nodet_threshold))) cond=true;   
         // @TODO: when others receive and verify the block , they request the accounting registers in the block that they dont have in their accounting collection */

        // Read TTL from authentication
        const Database = use('Database');

        result = yield Database.select('*').from('authentications').where('username', username).limit(1);
        var TTL = 0;
        if (result) {
            TTL = result.max_ttl;
        }
        // FLOOD      
        if (do_flood === true) {
            // SEND FLOODING REQUEST to neights
            // FUNCIÓN FLOOD que solo hace el networking SEPARADA DE
            // DE FUNCION FLOODING(llamada desde el request, con AA, Accounting de params y ejecucion de métodos(llama a flood)
            result = yield this.flood(c, m, d, url_params_mod.username, url_params_mod, result_raw, hash_p, TTL);
        }

        if (username && c && m) {
            // generate parameters for query
            const Database = use('Database');
            const id = yield Database
                    .table('accountings')
                    .insert({'username': username, 'process_hash': url_params_mod.process_hash, 'collection': c, 'method': m,
                        'parameters': p, 'result': r, 'created_by': username, 'updated_by': username,
                        'created_at': d, 'updated_at': d, 'block_hash': block_hash, 'hash': hash_p});
            const result_q = {"result": id};
            return (result_q);
        }
        // @TODO: si method=8, method=4 y perf>last, createNewBlock
        return ret;
    }

    /** @desc Returns a list of accounting registers */
    * GetList(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 7});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 7});
        }
        // Queries and result
        const Database = use('Database');
        const result = yield Database.select('*').from('accountings').limit(request.param('max_results'));
        // send response
        // ** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        yield response.sendView('master_JSON', {result: result, request_id: 7});
    }

    /** @desc Returns the the <id> process */
    * GetItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 7});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 2;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 7});
        }
        // Queries and result 
        const Database = use('Database');
        const process_hash = request.param('id');
        const result = yield Database.select('*').from('accountings').where('id', process_hash);
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 7});
    }

    * createItemQuery(request, response) {
        // generate parameters for query
        const Database = use('Database');
        var url_params = request.post();
        const username = url_params.username;
        const collection = url_params.collection;
        const method = url_params.method;
        const date = url_params.date;
        const parameters = url_params.parameters;
        const res = url_params.result;
        const block_hash = url_params.block_hash;
        const process_hash = url_params.process_hash;
        const created_by = url_params.username;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        // @todo TODO: Perform data validation
        // https://adonisjs.com/docs/3.2/validator
        // perform query and send view
        const result_q = yield Database
                .table('accountings')
                .insert({"username": username, "process_hash": process_hash, "collection": collection
                    , "method": method, "parameters": parameters
                    , "result": res, 'block_hash': block_hash
                    , 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at});
        const result = {"id": result_q};
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
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 7});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 3;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 7});
        }
        // Queries and response
        var resp;
        var result = yield * this.createItemQuery(request, resp);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=accounting, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const date_d = new Date;
        const d = date_d.toISOString();
        const account_res = yield * account.Account(collection, method, d, url_params, result);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 7});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 7});
    }
    * updateItemQuery(request, response) {
        // generate parameters for query
        const Database = use('Database');
        var url_params = request.post();
        const user_name = url_params.user_name;
        const collection = url_params.collection;
        const method = url_params.method;
        const date = url_params.date;
        const parameters = url_params.parameters;
        const res = url_params.result;
        const block_hash = url_params.block_hash;
        const process_hash = url_params.process_hash;
        const created_by = url_params.created_by;
        const updated_by = url_params.username;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        const active = url_params.active;
        //@todo TODO: Perform data validation
        // https://adonisjs.com/docs/3.2/validator
        // perform query and send view
        const affected_rows = yield Database
                .table('accountings')
                .where('id', request.param('id'))
                .update({"username": user_name, "process_hash": process_hash, "collection": collection, "method": method, "parameters": parameters, "result": res, 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at, 'block_hash': block_hash});
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
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 7});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 4;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 7});
        }
        // Queries and result
        var resp;
        var result = yield * this.updateItemQuery(request, resp);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=accounting, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const date_d = new Date;
        const d = date_d.toISOString();
        const account_res = yield * account.Account(collection, method, d, url_params, result);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 7});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 7});
    }
    /** @desc Returns the <id> of the created process */
    * deleteItemQuery(request, response) {
        const Database = use('Database');
        const process_hash = request.param('id');
        const deleted_count = yield Database.table('accountings').where('id', process_hash).delete();
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
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 7});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 5;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 7});
        }
        //Queries and result
        var resp;
        var result = yield * this.deleteItemQuery(request, resp);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=accounting, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting();
        const date_d = new Date;
        const d = date_d.toISOString();
        const account_res = yield * account.Account(collection, method, d, url_params, result);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 7});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 7});
    }
    /** @desc Renders the admin view  */
    * AdminView(request, response, error) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 7});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 7});
        }
        const Database = use('Database');
        const result = yield Database.select('*').from('accountings').limit(request.input('max_results'));
        yield response.sendView('accounting/admin_view', {
            title: 'Accounting Admin - Singularity',
            process_hash: url_params.process_hash, header: 'Accounting',
            description: 'Administrative View',
            collection: 'Accounting',
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
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 7});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 7});
        }

        const Database = use('Database');
        const user_id = request.param('id');
        const result = yield Database.select('*').from('accountings').where('id', user_id);
        yield response.sendView('accounting/detail_view', {
            title: 'Details - Singularity',
            process_hash: url_params.process_hash, header: 'Accounting',
            description: 'Details and Status',
            collection: 'Accounting',
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
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 7});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 7});
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
            yield response.sendView('accounting/create_view', {
                title: 'Create - Singularity',
                process_hash: url_params.process_hash, header: 'Accounting',
                description: 'Creation View',
                collection: 'Accounting',
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
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 7});
        }
        // Authorization layer (403 Error)
        const collection = 3;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 7});
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
            const result = yield Database.select('*').from('accountings').where('id', process_hash);
            yield response.sendView('accounting/update_view', {
                title: 'Edit - Singularity',
                process_hash: url_params.process_hash, header: 'Accounting',
                description: 'Editing View',
                collection: 'Accounting',
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
module.exports = AccountingController;
    