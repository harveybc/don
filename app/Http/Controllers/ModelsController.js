'use strict';
/** @desc
 Modelss, collection #5
 */
class ModelsController {
    /** @desc Returns a list of models registers*/
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
        const collection = 7;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result
        const Database = use('Database');
        const result = yield Database.select('*').from('models').limit(request.param('max_results'));
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
        const collection = 7;
        const method = 2;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result 
        const Database = use('Database');
        const model_hash = request.param('hash');
        const result = yield Database.select('*').from('models').where('id', model_hash);
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(request, response) {
        // generate parameters for query
        var url_params = request.post();
        // assign variables to url parameters
        const name = url_params.name;
        const description = url_params.description;
        const app_hash = url_params.app_hash;
        const model_link = url_params.model_link;
        const model_text = url_params.model_text;
        const model_blob = url_params.model_blob;
        const validation_hash = url_params.validation_hash;
        const hash = url_params.hash;
        const tags = url_params.tags;
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
                .table('models')
                .insert({
                    "name": name
                    , "description": description
                    , "app_hash": app_hash
                    , "model_link": model_link
                    , "model_text": model_text
                    , "model_blob": model_blob
                    , "validation_hash": validation_hash
                    , "hash": hash
                    , "tags": tags
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
        const collection = 7;
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
        // collections: 1=authent, 2=authoriz, 3=models, 4=processes, 5=parameters, 6=models, 7=network */
        // 
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
    /* Update sql query*/
    * updateItemQuery(request, response) {
        // generate parameters for query
        var url_params = request.post();
        // assign variables to url parameters
        const name = url_params.name;
        const description = url_params.description;
        const app_hash = url_params.app_hash;
        const model_link = url_params.model_link;
        const model_text = url_params.model_text;
        const model_blob = url_params.model_blob;
        const validation_hash = url_params.validation_hash;
        const hash = url_params.hash;
        const tags = url_params.tags;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        const Database = use('Database');
        // perform query and send view
        const affected_rows = yield Database
                .table('models')
                .where('hash', request.param('id'))
                .update({
                    "name": name
                    , "description": description
                    , "app_hash": app_hash
                    , "model_link": model_link
                    , "model_text": model_text
                    , "model_blob": model_blob
                    , "validation_hash": validation_hash
                    , "hash": hash
                    , "tags": tags
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
        const collection = 7;
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
        // Model layer
        // collections: 1=authent, 2=authoriz, 3=model, 4=processes, 5=parameters, 6=models, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
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
    * deleteItemQuery(request, response) {
        const Database = use('Database');
        const process_hash = request.param('id');
        const deleted_count = yield Database.table('models').where('id', process_hash).delete();
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
        const collection = 7;
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
        // collections: 1=authent, 2=authoriz, 3=models, 4=processes, 5=parameters, 6=models, 7=network */
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
        var Authe = use('App/Http/Controllers/AuthenticationController');
        var authe = new Authe();
        const authe_res = yield * authe.AuthenticateUser(url_params.username, url_params.pass_hash);
        if (!authe_res) {
            yield response.sendView('master_JSON', {result: {"error": authe_res, "code": 401}, request_id: 3});
        }
        // Authorization layer (403 Error)
        const collection = 7;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const result = yield Database.select('*').from('models').limit(request.input('max_results'));
        yield response.sendView('models/admin_view', {
            title: 'Models Admin - Singularity',
            process_hash: url_params.process_hash, header: 'Models',
            description: 'Administrative View',
            collection: 'Models',
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
                {attr: "hash", title: "hash", type: "text", width: 70},
                {attr: "name", title: "name", type: "text", width: 30},
                {attr: "model_link", title: "model_link", type: "text", width: 30},
                {attr: "model_text", title: "model_text", type: "text", width: 30}
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
        const collection = 7;
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
            yield response.sendView('models/create_view', {
                title: 'Create - Singularity',
                process_hash: url_params.process_hash, header: 'Models',
                description: 'Creation View',
                collection: 'Models',
                view: 'Create',
                user_full_name: 'Harvey Bastidas',
                username: url_params.username,
                pass_hash: url_params.pass_hash,
                user_role: 'Administrator',
                items: [
                    {attr: "name", title: "name", type: "text", width: 30},
                    {attr: "description", title: "description", type: "text", width: 30},
                    {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                    {attr: "model_link", title: "model_link", type: "text", width: 30},
                    {attr: "model_text", title: "model_text", type: "text", width: 30},
                    {attr: "model_blob", title: "model_blob", type: "text", width: 30},
                    {attr: "validation_hash", title: "validation_hash", type: "text", width: 30},
                    {attr: "hash", title: "hash", type: "text", width: 30},
                    {attr: "tags", title: "tags", type: "text", width: 30}

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
        const collection = 7;
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
            const result = yield Database.select('*').from('models').where('id', process_hash);
            yield response.sendView('models/update_view', {
                title: 'Edit - Singularity',
                process_hash: url_params.process_hash,
                header: 'Models',
                description: 'Editing View',
                collection: 'Models',
                view: 'Update : ' + result[0].id,
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                pass_hash: url_params.pass_hash,
                data: result,
                hash: result[0].hash,
                username: url_params.username,
                items: [
                    {attr: "name", title: "name", type: "text", width: 30},
                    {attr: "description", title: "description", type: "text", width: 30},
                    {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                    {attr: "model_link", title: "model_link", type: "text", width: 30},
                    {attr: "model_text", title: "model_text", type: "text", width: 30},
                    {attr: "model_blob", title: "model_blob", type: "text", width: 30},
                    {attr: "validation_hash", title: "validation_hash", type: "text", width: 30},
                    {attr: "hash", title: "hash", type: "text", width: 30},
                    {attr: "tags", title: "tags", type: "text", width: 30}

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
        const collection = 7;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const user_id = request.param('id');
        const result = yield Database.select('*').from('models').where('id', user_id);
        yield response.sendView('models/detail_view', {
            title: 'Details - Singularity',
            process_hash: url_params.process_hash, header: 'Models',
            description: 'Details and Status',
            collection: 'Models',
            view: 'Details: ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            data: result,
            user_id: user_id,
            items: [
                {attr: "name", title: "name", type: "text", width: 30},
                {attr: "description", title: "description", type: "text", width: 30},
                {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                {attr: "model_link", title: "model_link", type: "text", width: 30},
                {attr: "model_text", title: "model_text", type: "text", width: 30},
                {attr: "model_blob", title: "model_blob", type: "text", width: 30},
                {attr: "validation_hash", title: "validation_hash", type: "text", width: 30},
                {attr: "hash", title: "hash", type: "text", width: 30},
                {attr: "tags", title: "tags", type: "text", width: 30}

            ]
        });
    }
}
module.exports = ModelsController;
    