'use strict';
/** @desc
 Authenticationes dummy controller for testing database, it uses static test data.
 */
class AuthenticationController {
    /** @desc Verifies 4 Pass Bcrypt Hash of a user pass  */
    * AuthenticateUser(username, pass_hash) {
        // TODO: RATE-LIMITING LAYER
        // searches for the username and verifies if the pass_hash is the saved one  
        if (username && pass_hash) {
            const Database = use('Database');
            const result = yield Database.select('pass_hash').from('authentications').where('username', username);
            if (result[0].pass_hash === pass_hash) {
                return true;
            } else {
                return false;
            }
        } else
            return false;
    }

    /** @desc Returns a list of authentication */
    * GetList(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        const auth_res = yield * this.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 1;
        const method = 1;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        // Queries
        const Database = use('Database');
        const result = yield Database.select('*').from('authentications').limit(request.param('max_results'));
        // Accounting

        // send response
        // ** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the the <id> process */
    * GetItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        const auth_res = yield * this.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 1;
        const method = 2;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const process_hash = request.param('id');
        const result = yield Database.select('*').from('authentications').where('id', process_hash);
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(request, response) {
        // generate parameters for query
        const Database = use('Database');
        const url_params = request.post();
        const user_name = url_params.user_name;
        const name = url_params.name;
        const public_key = url_params.public_key;
        const pass_hash = url_params.passhash;
        const active = url_params.active;
        const app_hash = url_params.app_hash;
        const max_connections = url_params.max_connections;
        const max_neighbors = url_params.max_neighbors;
        const max_ttl = url_params.max_ttl;
        const created_by = url_params.username;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        // @todo TODO: Perform data validation
        // https://adonisjs.com/docs/3.2/validator
        // @todo TODO: Crear clave pública y privada,
        //              almacenar la pública y enviar 
        //              la privada en la respuesta del 
        //              request.
        // perform query and send view
        const process_hash = yield Database
                .table('authentications')
                .insert({'name': name, 'username': user_name, 'public_key': public_key, 'pass_hash': pass_hash, 'app_hash': app_hash
                    , 'max_connections': max_connections, 'max_neighbors': max_neighbors, 'max_ttl': max_ttl
                    , 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at, 'active': active});
        const result = {"id": process_hash};
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
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 4});
        }
        // Authorization layer (403 Error)
        const collection = 1;
        const method = 3;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        var resp;
        var result = yield * this.createItemQuery(request, resp);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=accounting, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting(); const date_d = new Date; const d = date_d.toISOString();
        // the last parameter is the flooding flag
        const account_res = yield * account.Account(collection, method, d ,url_params, result, true);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {"result": result, "account_res": account_res, "request_id": 5});
    }
    * updateItemQuery(request, response) {
        // generate parameters for query
        const Database = use('Database');
        const url_params = request.post();
        const name = url_params.name;
        const user_name = url_params.user_name;
        const public_key = url_params.public_key;
        const pass_hash = url_params.passhash;
        const app_hash = url_params.app_hash;
        const max_connections = url_params.max_connections;
        const max_neighbors = url_params.max_neighbors;
        const max_ttl = url_params.max_ttl;
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
                .table('authentications')
                .where('id', request.param('id'))
                .update({'name': name, 'username': user_name, 'public_key': public_key, 'pass_hash': pass_hash, 'app_hash': app_hash
                    , 'max_connections': max_connections, 'max_neighbors': max_neighbors, 'max_ttl': max_ttl
                    , 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at, 'active': active});
        const result = {"affected_rows": affected_rows};
        return (result);
    }
    /** @desc Returns the <id> of the created process */
    * UpdateItem(request, response) {
        var url_params = request.post();
        // Authentication layer (401 Error)
        const auth_res = yield * this.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 1;
        const method = 4;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        var resp;
        var result = yield * this.updateItemQuery(request, resp);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=accounting, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting(); const date_d = new Date; const d = date_d.toISOString();
        const account_res = yield * account.Account(collection, method, d ,url_params, result);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    
    
    /** @desc Returns the <id> of the created process */
    * deleteItemQuery(request, response) {
    /** @desc Returns the <id> of the created process */
        const Database = use('Database');
        const process_hash = request.param('id');
        const deleted_count = yield Database.table('authentications').where('id', process_hash).delete();
        const result = {"deleted_count": deleted_count};
        return result;
    }
    
    * DeleteItem(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        const auth_res = yield * this.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 1;
        const method = 5;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        var resp;
        var result = yield * this.deleteItemQuery(request, resp);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=accounting, 4=processes, 5=parameters, 6=blocks, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting(); const date_d = new Date; const d = date_d.toISOString();
        const account_res = yield * account.Account(collection, method, d ,url_params, result);
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
        const auth_res = yield * this.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 1;
        const method = 1;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const result = yield Database.select('*').from('authentications').limit(request.input('max_results'));
        yield response.sendView('authentication/admin_view', {
            title: 'Authentication Admin - Singularity',
            process_hash: url_params.process_hash, header: 'Authentication',
            description: 'Administrative View',
            collection: 'Authentication',
            view: 'Admin',
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            error: error,
            data: result, username: url_params.username, pass_hash: url_params.pass_hash
        });
    }
    /** @desc Renders the edit view  */
    * DetailView(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        const auth_res = yield * this.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 1;
        const method = 2;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const user_id = request.param('id');
        const result = yield Database.select('*').from('authentications').where('id', user_id);
        yield response.sendView('authentication/detail_view', {
            title: 'User Details - Singularity',
            process_hash: url_params.process_hash, header: 'Authentication',
            description: 'Details and Status',
            collection: 'Authentication',
            view: 'Details: ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            data: result, username: url_params.username, pass_hash: url_params.pass_hash,
            user_id: user_id
        });
    }
    /** @desc Renders the create view  */
    * CreateView(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        const auth_res = yield * this.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 1;
        const method = 3;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
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
            yield response.sendView('authentication/create_view', {
                title: 'Create User - Singularity',
                process_hash: url_params.process_hash, header: 'Authentication',
                description: 'Creation View',
                collection: 'Authentication',
                view: 'Create',
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                username: url_params.username,
                pass_hash: url_params.pass_hash
            });
        }
    }
    /** @desc Renders the edit view  */
    * UpdateView(request, response) {
        var url_params = request.get();
        // Authentication layer (401 Error)
        const auth_res = yield * this.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!auth_res) {
            yield response.sendView('master_JSON', {result: {"error": auth_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 1;
        const method = 4;
        var AA = use('App/Http/Controllers/AuthorizationController');
        var aa = new AA();
        const auth_res_2 = yield * aa.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!auth_res_2) {
            yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code": 403}, request_id: 3});
        }

        const auth_id = request.param('id');
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
            const result = yield Database.select('*').from('authentications').where('id', auth_id);
            yield response.sendView('authentication/update_view', {
                title: 'Edit User - Singularity',
                process_hash: url_params.process_hash, header: 'Authentication',
                description: 'Editing View',
                collection: 'Authentication',
                view: 'Update : ' + auth_id,
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                auth_id: auth_id,
                data: result, username: url_params.username, pass_hash: url_params.pass_hash

            });
        }
    }
}
module.exports = AuthenticationController;
