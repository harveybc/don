'use strict';
/** @desc
 Authorizations, collection 1
 */
// @TODO: ADICIONAR autorizacion para transacciones, son los mismos clientes?
class AuthorizationController {
    /** @desc searches for the username´s role and verifies if method  in collection c is allowed (defaul:deny all)  */
    * AuthorizeUser(username, process_hash, c, method) {
        var ret = false;
        var result;
        // collection 5 doesnot verify processhash
        if (username && c && method && (process_hash || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11))) {
            const Database = use('Database');
            // Consulta app_hash del process_hash y del user_id para validar que sean el mismo
            var process_app_hash = "";
            var user_app_hash = "";
            // TODO: ARREGLAR AUTORIZACIÓN POR APPHASH SOLO EN REQUESTS DE SCOPE=APPLICATION como datasets o models
            /* if (c != 5) {
             process_app_hash = yield Database.select('app_hash').from('processes').where('hash', process_hash);
             user_app_hash = yield Database.select('app_hash').from('authentications').where('username', username);
             }
             */
            if (process_app_hash === user_app_hash) {
                // consulta el rol de la tabla autorizathions            
                result = yield Database.select('role').from('authorizations').where('username', username);
                // @TODO: colocar per-role authorizations desde nueva colección
                // Per role authorizations
                // role==1:admin,2:node,3:optimizer,4:evaluator,5:client
                if (result[0].role === 1) {
                    // method==1:GetList/AdminView,2:GetItem/DetailView,3:CreateItem/CreateView,4:UpdateItem/UpdateView,5:DeleteItem
                    // collection==1:Authentication,2:Authorization,3:Accounting,4:Applications,5:Processes,6:Models,7:Datasets,8:Parameters,9:Blocks,10:Neighbors,11:Network,12:Evaluations,13:Inputs,14:Outputs
                    if (method === 1) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 2) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 3) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 4) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 5) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 6) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    }
                } else if (result[0].role === 2) {
                    // method==1:GetList/AdminView,2:GetItem/DetailView,3:CreateItem/CreateView,4:UpdateItem/UpdateView,5:DeleteItem
                    // collection==0:Authentication,1:Authorization,2:,3:Accounting,4:Applications,5:Processes,6:Models,7:Datasets,8:Parameters,9:Blocks,10:Neighbors,11:Network,12:Evaluations,13:Inputs,14:Outputs
                    if (method === 1) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 2) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 3) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 4) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 5) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 6) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    }
                } else if (result[0].role === 3) {
                    // method==1:GetList/AdminView,2:GetItem/DetailView,3:CreateItem/CreateView,4:UpdateItem/UpdateView,5:DeleteItem
                    // collection==0:Authentication,1:Authorization,2:,3:Accounting,4:Applications,5:Processes,6:Models,7:Datasets,8:Parameters,9:Blocks,10:Neighbors,11:Network,12:Evaluations,13:Inputs,14:Outputs
                    if (method === 1) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 2) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 3) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 4) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 5) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 6) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    }
                } else if (result[0].role === 4) {
                    // method==1:GetList/AdminView,2:GetItem/DetailView,3:CreateItem/CreateView,4:UpdateItem/UpdateView,5:DeleteItem
                    // collection==0:Authentication,1:Authorization,2:,3:Accounting,4:Blocks,5:Datasets,6:Evaluations,7:Models,8:Parameters,9:Neighbors,10:Applications,11:Processes
                    if (method === 1) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 2) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 3) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 4) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 5) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 6) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    }
                } else if (result[0].role === 5) {
                    // method==1:GetList/AdminView,2:GetItem/DetailView,3:CreateItem/CreateView,4:UpdateItem/UpdateView,5:DeleteItem
                    // collection==0:Authentication,1:Authorization,2:,3:Accounting,4:Applications,5:Processes,6:Models,7:Datasets,8:Parameters,9:Blocks,10:Neighbors,11:Network,12:Evaluations,13:Inputs,14:Outputs
                    if (method === 1) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 2) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 3) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 4) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 5) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    } else if (method === 6) {
                        if ((c === 1) || (c === 2) || (c === 3) || (c === 4) || (c === 5) || (c === 6) || (c === 7) || (c === 8) || (c === 9) || (c === 10) || (c === 11) || (c === 12) || (c === 13) || (c === 14))
                            ret = true;
                    }
                }
            }
        }
        return ret;
    }
    /** @desc Returns a list of authorization */
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
        const collection = 2;
        const method = 1;
        const auth_res_2 = yield * this.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // Queries
        const Database = use('Database');
        const result = yield Database.select('*').from('authorizations').limit(request.param('max_results'));
        // Accounting layer

        // send response
        // ** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
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
        const collection = 2;
        const method = 2;
        const auth_res_2 = yield * this.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }

        const Database = use('Database');
        const process_hash = request.param('id');
        const result = yield Database.select('*').from('authorizations').where('id', process_hash);

        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(url_params) {
        // generate parameters for query
        const Database = use('Database');
        const user_name = url_params.user_name;
        const process_hash = url_params.process_hash;
        const role = url_params.role_key;
        const created_by = url_params.username;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        const active = url_params.active;
        // @todo TODO: Perform data validation
        // https://adonisjs.com/docs/3.2/validator

        // perform query and send view
        const res = yield Database
                .table('authorizations')
                .insert({'username': user_name, 'process_hash': process_hash, 'role': role, 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at, 'active': active});
        const result = {"id": res};
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
        const collection = 2;
        const method = 3;
        const auth_res_2 = yield * this.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
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
        const Database = use('Database');
        const user_name = url_params.user_name;
        const process_hash = url_params.process_hash;
        const role = url_params.role_key;
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
                .table('authorizations')
                .where('id', id)
                .update({'username': user_name, 'process_hash': process_hash, 'role': role, 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at, 'active': active});
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
        const collection = 2;
        const method = 4;
        const auth_res_2 = yield * this.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }

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
        const account_res = yield * account.Account(collection, method, d, url_params.username, JSON.stringify(url_params), JSON.stringify(result), hash_p, true, request.param('id'));
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }

    * deleteItemQuery(url_params,id) {
        const Database = use('Database');
        const process_hash = id;
        const deleted_count = yield Database.table('authorizations').where('id', process_hash).delete();
        const result = {"deleted_count": deleted_count};
        return result;
    }

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
        const collection = 2;
        const method = 5;
        const auth_res_2 = yield * this.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
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
        const collection = 2;
        const method = 1;
        const auth_res_2 = yield * this.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }

        const Database = use('Database');
        const result = yield Database.select('*').from('authorizations').limit(request.input('max_results'));
        yield response.sendView('authorization/admin_view', {
            title: 'Authorization Admin - Singularity',
            process_hash: url_params.process_hash, header: 'Authorization',
            description: 'Administrative View',
            collection: 'Authorization',
            view: 'Admin',
            user_full_name: 'Harvey Bastidas',
            // @TODO: CAMBIAR EN TODAS LAS REQUESTS EL ROL del GUI user_role POR EL DE AUTHORIZATIONS
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
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 2;
        const method = 2;
        const auth_res_2 = yield * this.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }

        const Database = use('Database');
        const user_id = request.param('id');
        const result = yield Database.select('*').from('authorizations').where('id', user_id);
        yield response.sendView('authorization/detail_view', {
            title: 'User Details - Singularity',
            process_hash: url_params.process_hash, header: 'Authorization',
            description: 'Details and Status',
            collection: 'Authorization',
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
        var A = use('App/Http/Controllers/AuthenticationController');
        var a = new A();
        const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 2;
        const method = 3;
        const auth_res_2 = yield * this.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
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
            yield response.sendView('authorization/create_view', {
                title: 'Create User - Singularity',
                process_hash: url_params.process_hash, header: 'Authorization',
                description: 'Creation View',
                collection: 'Authorization',
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
        const collection = 2;
        const method = 4;
        const auth_res_2 = yield * this.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
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
            const result = yield Database.select('*').from('authorizations').where('id', process_hash);
            yield response.sendView('authorization/update_view', {
                title: 'Edit User - Singularity',
                process_hash: request.param('id'), header: 'Authorization',
                description: 'Editing View',
                collection: 'Authorization',
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
module.exports = AuthorizationController;
    