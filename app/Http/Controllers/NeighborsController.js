'use strict';
/** @desc
 Neighborss, collection #5
 */
class NeighborsController {
    /** @desc Returns a list of neighbors registers*/
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
        const collection = 9;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result
        const Database = use('Database');
        const result = yield Database.select('*').from('neighbors').limit(request.param('max_results'));
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
        const collection = 9;
        const method = 2;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result 
        const Database = use('Database');
        const neighbor_hash = request.param('hash');
        const result = yield Database.select('*').from('neighbors').where('id', neighbor_hash);
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(request, response) {
        // generate neighbors for query
        var url_params = request.post();
        // assign variables to url neighbors
        const app_hash = url_params.app_hash;
        const address = url_params.address;
        const distance = url_params.distance;
        const latency = url_params.latency;
        const selection_method = url_params.selection_method;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        // @todo TODO: Perform data validation in neighbors https://adonisjs.com/docs/3.2/validator
        const Database = use('Database');
        const resq =
                yield Database
                .table('neighbors')
                .insert({
                     "app_hash": app_hash
                    , "address": address
                    , "distance": distance
                    , "latency": latency
                    , "selection_method": selection_method
                    , 'created_by': created_by, 'updated_by': updated_by
                    , 'created_at': created_at, 'updated_at': updated_at});
        // resultado de inserción de bloque
        return ({"id": resq});
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
        const collection = 9;
        const method = 3;
       
        
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 4});
        }
        
        
        // Queries and response
        var resp;
        var result = yield * this.createItemQuery(request, resp);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=neighbors, 4=processes, 5=neighbors, 6=neighbors, 7=network */
        // 
// Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, neighbors, result, process_hash, (string) 
        var Accounting = use('App/Http/Controllers/AccountingController');
        var account = new Accounting(); const date_d = new Date; const d = date_d.toISOString();
        const account_res = yield * account.Account(collection, method, d ,url_params, result);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /* Update sql query*/
    * updateItemQuery(request, response) {
        // generate neighbors for query
        var url_params = request.post();
        // assign variables to url neighbors
        const app_hash = url_params.app_hash;
        const address = url_params.address;
        const distance = url_params.distance;
        const latency = url_params.latency;
        const selection_method = url_params.selection_method;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        const Database = use('Database');
        // perform query and send view
        const affected_rows = yield Database
                .table('neighbors')
                .where('hash', request.param('id'))
                .update({
                     "app_hash": app_hash
                    , "address": address
                    , "distance": distance
                    , "latency": latency
                    , "selection_method": selection_method
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
        const collection = 9;
        const method = 4;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result
        var resp;
        var result = yield * this.updateItemQuery(request, resp);
        // Neighbor layer
        // collections: 1=authent, 2=authoriz, 3=neighbor, 4=processes, 5=neighbors, 6=neighbors, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, neighbors, result, process_hash, (string) 
        var Account = use('App/Http/Controllers/AccountingController');
        var account = new Accounting(); const date_d = new Date; const d = date_d.toISOString();
        const account_res = yield * account.Account(collection, method, d ,url_params, result);
        if (!account_res) {
            yield response.sendView('master_JSON', {result: {"error": account_res, "code": 402}, request_id: 3});
        }
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    
    /** @desc Returns the <id> of the created process */
    * DeleteItem(request, response) {
            const Database = use('Database');
        const process_hash = request.param('id');
        const deleted_count = yield Database.table('neighbors').where('id', process_hash).delete();
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
        const collection = 9;
        const method = 5;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        //Queries and result
        var resp;
        var result = yield * this.deleteItemQuery(request, resp);
        
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=neighbors, 4=processes, 5=neighbors, 6=neighbors, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, neighbors, result, process_hash, (string) 
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
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 9;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const result = yield Database.select('*').from('neighbors').limit(request.input('max_results'));
        yield response.sendView('neighbors/admin_view', {
            title: 'Neighbors Admin - Singularity',
            process_hash: url_params.process_hash, header: 'Neighbors',
            description: 'Administrative View',
            collection: 'Neighbors',
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
                {attr: "address", title: "address", type: "text", width: 30},
                {attr: "distance", title: "distance", type: "text", width: 30},
                {attr: "latency", title: "latency", type: "text", width: 30}
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
        const collection = 9;
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
            yield response.sendView('neighbors/create_view', {
                title: 'Create - Singularity',
                process_hash: url_params.process_hash, header: 'Neighbors',
                description: 'Creation View',
                collection: 'Neighbors',
                view: 'Create',
                user_full_name: 'Harvey Bastidas',
                username: url_params.username,
                pass_hash: url_params.pass_hash,
                user_role: 'Administrator',
                items: [
                    {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                    {attr: "address", title: "address", type: "text", width: 30},
                    {attr: "distance", title: "distance", type: "text", width: 30},
                    {attr: "latency", title: "latency", type: "text", width: 30},
                    {attr: "selection_method", title: "selection_method", type: "text", width: 30},
                    
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
        const collection = 9;
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
            var result = yield Database.select('*').from('neighbors').where('id', process_hash);
            //result = [{id:4,app_hash:1,address:1,distance:1,latency:1}]
            yield response.sendView('neighbors/update_view', {
                title: 'Edit - Singularity',
                process_hash: url_params.process_hash,
                header: 'Neighbors',
                description: 'Editing View',
                collection: 'Neighbors',
                view: 'Update : ' + result[0].id,
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                pass_hash: url_params.pass_hash,
                data: result,
                hash: result[0].hash,
                username: url_params.username,
                items: [
                    {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                    {attr: "address", title: "address", type: "text", width: 30},
                    {attr: "distance", title: "distance", type: "text", width: 30},
                    {attr: "latency", title: "latency", type: "text", width: 30},
                    {attr: "selection_method", title: "selection_method", type: "text", width: 30},

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
        const collection = 9;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const user_id = request.param('id');
        const result = yield Database.select('*').from('neighbors').where('id', user_id);
        yield response.sendView('neighbors/detail_view', {
            title: 'Details - Singularity',
            process_hash: url_params.process_hash, header: 'Neighbors',
            description: 'Details and Status',
            collection: 'Neighbors',
            view: 'Details: ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            data: result,
            user_id: user_id,
            items: [
                    {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                    {attr: "address", title: "address", type: "text", width: 30},
                    {attr: "distance", title: "distance", type: "text", width: 30},
                    {attr: "latency", title: "latency", type: "text", width: 30},
                    {attr: "selection_method", title: "selection_method", type: "text", width: 30},

            ]
        });
    }
}
module.exports = NeighborsController;
    