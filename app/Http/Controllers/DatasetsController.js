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
        const collection = 5;
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
        const collection = 5;
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
    * createItemQuery(url_params) {
        // assign variables to url parameters
        const name = url_params.name;
        const description = url_params.description;
        const observations = url_params.observations;
        const features = url_params.features;
        const resolution = url_params.resolution;
        const training_signals = url_params.training_signals;
        const model_hash = url_params.model_hash;
        const app_hash = url_params.app_hash;

        const dataset_link = url_params.dataset_link;
        const dataset_text = url_params.dataset_text;
        const dataset_blob = url_params.dataset_blob;
        const validation_hash = url_params.validation_hash;
        const hash = url_params.hash;
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
                .table('datasets')
                .insert({
                    "name": name
                    , "description": description
                    , "observations": observations
                    , "features": features
                    , "resolution": resolution
                    , "training_signals": training_signals
                    , "model_hash": model_hash
                    , "app_hash": app_hash
                    , "dataset_link": dataset_link
                    , "dataset_text": dataset_text
                    , "dataset_blob": dataset_blob
                    , "validation_hash": validation_hash
                    , "hash": hash
                    , "performance": performance

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
        const collection = 5;
        const method = 3;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 4});
        }
        // Queries and response
        var resp;
        var result = yield * this.createItemQuery(url_params);
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=datasets, 4=processes, 5=parameters, 6=datasets, 7=network */
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
    * updateItemQuery(url_params,id) {
        // generate parameters for query
        const name = url_params.name;
        const description = url_params.description;
        const observations = url_params.observations;
        const features = url_params.features;
        const resolution = url_params.resolution;
        const training_signals = url_params.training_signals;
        const model_hash = url_params.model_hash;
        const app_hash = url_params.app_hash;

        const dataset_link = url_params.dataset_link;
        const dataset_text = url_params.dataset_text;
        const dataset_blob = url_params.dataset_blob;
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
                .table('datasets')
                .where('hash',id)
                .update({
                    "name": name
                    , "description": description
                    , "observations": observations
                    , "features": features
                    , "resolution": resolution
                    , "training_signals": training_signals
                    , "model_hash": model_hash
                    , "app_hash": app_hash
                    , "dataset_link": dataset_link
                    , "dataset_text": dataset_text
                    , "dataset_blob": dataset_blob
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
        const collection = 5;
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
        // Dataset layer
        // collections: 1=authent, 2=authoriz, 3=dataset, 4=processes, 5=parameters, 6=datasets, 7=network */
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
        const deleted_count = yield Database.table('datasets').where('id', process_hash).delete();
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
        const collection = 5;
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
        // collections: 1=authent, 2=authoriz, 3=datasets, 4=processes, 5=parameters, 6=datasets, 7=network */
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
        const collection = 5;
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
            data: result,
            items: [
                {attr: "id", title: "id", type: "number", width: 20},
                {attr: "hash", title: "hash", type: "text", width: 70},
                {attr: "observations", title: "obs", type: "number", width: 30},
                {attr: "features", title: "feats", type: "text", width: 30},
                {attr: "training_signals", title: "train", type: "text", width: 30}
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
        const collection = 5;
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
                user_role: 'Administrator',
                items: [
                    {attr: "name", title: "name", type: "text", width: 30},
                    {attr: "description", title: "description", type: "text", width: 30},
                    {attr: "observations", title: "observations", type: "text", width: 30},
                    {attr: "features", title: "features", type: "text", width: 30},
                    {attr: "resolution", title: "resolution", type: "text", width: 30},
                    {attr: "training_signals", title: "training_signals", type: "text", width: 30},
                    {attr: "model_hash", title: "model_hash", type: "text", width: 30},
                    {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                    {attr: "dataset_link", title: "dataset_link", type: "text", width: 30},
                    {attr: "dataset_text", title: "dataset_text", type: "text", width: 30},
                    {attr: "dataset_blob", title: "dataset_blob", type: "text", width: 30},
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
        const collection = 5;
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
                process_hash: url_params.process_hash,
                header: 'Datasets',
                description: 'Editing View',
                collection: 'Datasets',
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
                    {attr: "observations", title: "observations", type: "text", width: 30},
                    {attr: "features", title: "features", type: "text", width: 30},
                    {attr: "resolution", title: "resolution", type: "text", width: 30},
                    {attr: "training_signals", title: "training_signals", type: "text", width: 30},
                    {attr: "model_hash", title: "model_hash", type: "text", width: 30},
                    {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                    {attr: "dataset_link", title: "dataset_link", type: "text", width: 30},
                    {attr: "dataset_text", title: "dataset_text", type: "text", width: 30},
                    {attr: "dataset_blob", title: "dataset_blob", type: "text", width: 30},
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
        const collection = 5;
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
            user_id: user_id,
            items: [
                {attr: "name", title: "name", type: "text", width: 30},
                {attr: "description", title: "description", type: "text", width: 30},
                {attr: "observations", title: "observations", type: "text", width: 30},
                {attr: "features", title: "features", type: "text", width: 30},
                {attr: "resolution", title: "resolution", type: "text", width: 30},
                {attr: "training_signals", title: "training_signals", type: "text", width: 30},
                {attr: "model_hash", title: "model_hash", type: "text", width: 30},
                {attr: "app_hash", title: "app_hash", type: "text", width: 30},
                {attr: "dataset_link", title: "dataset_link", type: "text", width: 30},
                {attr: "dataset_text", title: "dataset_text", type: "text", width: 30},
                {attr: "dataset_blob", title: "dataset_blob", type: "text", width: 30},
                {attr: "validation_hash", title: "validation_hash", type: "text", width: 30},
                {attr: "hash", title: "hash", type: "text", width: 30},
                {attr: "performance", title: "performance", type: "text", width: 30}
            ]
        });
    }
}
module.exports = DatasetsController;
    