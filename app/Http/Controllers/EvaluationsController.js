'use strict';
/** @desc
 Evaluationss, collection #5
 */
class EvaluationsController {
    /** @desc Returns a list of evaluations registers*/
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
        const collection = 6;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result
        const Database = use('Database');
        const result = yield Database.select('*').from('evaluations').limit(request.param('max_results'));
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
        const collection = 6;
        const method = 2;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        // Queries and result 
        const Database = use('Database');
        const evaluation_hash = request.param('hash');
        const result = yield Database.select('*').from('evaluations').where('id', evaluation_hash);
        // send response
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(request, response) {
        // generate parameters for query
        var url_params = request.post();
        // assign variables to url parameters
        const observations = url_params.observations;
        const features = url_params.features;
        const resolution = url_params.resolution;
        const training_signals = url_params.training_signals;
        const model_hash = url_params.model_hash;
        const parameter_hash = url_params.parameter_hash;
        const process_hash = url_params.process_hash;
        const input_link = url_params.input_link;
        const input_text = url_params.input_text;
        const input_blob = url_params.input_blob;
        const input_hash = url_params.input_hash;
        const output_link = url_params.output_link;
        const output_text = url_params.output_text;
        const output_blob = url_params.output_blob;
        const output_hash = url_params.output_hash;
        const hash = url_params.hash;
        const error = url_params.error;
        const evaluator_hash = url_params.evaluator_hash;
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
                .table('evaluations')
                .insert({
                      "observations": observations
                    , "features": features
                    , "resolution": resolution
                    , "training_signals": training_signals
                    , "model_hash": model_hash
                    , "parameter_hash": parameter_hash
                    , "input_hash": input_hash
                    , "process_hash": process_hash
                    , "input_link": input_link
                    , "input_text": input_text
                    , "input_blob": input_blob
                    , "input_hash": input_hash
                    , "output_link": output_link
                    , "output_text": output_text
                    , "output_blob": output_blob
                    , "output_hash": output_hash
                    , "hash": hash
                    , "error": error
                    , "evaluator_hash": evaluator_hash
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
        const collection = 6;
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
        // collections: 1=authent, 2=authoriz, 3=evaluations, 4=processes, 5=parameters, 6=evaluations, 7=network */
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
    /* Update sql query*/
    * updateItemQuery(request, response) {
        // generate parameters for query
        var url_params = request.post();
        // assign variables to url parameters
        const observations = url_params.observations;
        const features = url_params.features;
        const resolution = url_params.resolution;
        const training_signals = url_params.training_signals;
        const model_hash = url_params.model_hash;
        const parameter_hash = url_params.parameter_hash;
        const input_hash = url_params.input_hash;
        const process_hash = url_params.process_hash;
        const input_link = url_params.input_link;
        const input_text = url_params.input_text;
        const input_blob = url_params.input_blob;
        const output_link = url_params.output_link;
        const output_text = url_params.output_text;
        const output_blob = url_params.output_blob;
        const output_hash = url_params.output_hash;
        const hash = url_params.hash;
        const error = url_params.error;
        const evaluator_hash = url_params.evaluator_hash;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const created_at_d = new Date;
        const updated_at_d = created_at_d;
        const created_at = created_at_d.toISOString();
        const updated_at = updated_at_d.toISOString();
        const Database = use('Database');
        // perform query and send view
        const affected_rows = yield Database
                .table('evaluations')
                .where('hash', request.param('id'))
                .update({
                    "observations": observations
                    , "features": features
                    , "resolution": resolution
                    , "training_signals": training_signals
                    , "model_hash": model_hash
                    , "parameter_hash": parameter_hash
                    , "process_hash": process_hash
                    , "input_link": input_link
                    , "input_text": input_text
                    , "input_blob": input_blob
                    , "input_hash": input_hash
                    , "output_link": output_link
                    , "output_text": output_text
                    , "output_blob": output_blob
                    , "output_hash": output_hash
                    , "hash": hash
                    , "error": error
                    , "evaluator_hash": evaluator_hash
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
        const collection = 6;
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
        // Evaluation layer
        // collections: 1=authent, 2=authoriz, 3=evaluation, 4=processes, 5=parameters, 6=evaluations, 7=network */
        // Account(username, c, m, d, p, r, process_hash) - username, collection, method, date, parameters, result, process_hash, (string) 
        var Account = use('App/Http/Controllers/AccountingController');
        var account = new Account();
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
        const collection = 6;
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
        const deleted_count = yield Database.table('evaluations').where('id', process_hash).delete();
        const result = {"deleted_count": deleted_count};
        // Accounting layer
        // collections: 1=authent, 2=authoriz, 3=evaluations, 4=processes, 5=parameters, 6=evaluations, 7=network */
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
        const collection = 6;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }
        const Database = use('Database');
        const result = yield Database.select('*').from('evaluations').limit(request.input('max_results'));
        yield response.sendView('evaluations/admin_view', {
            title: 'Evaluations Admin - Singularity',
            process_hash: url_params.process_hash, header: 'Evaluations',
            description: 'Administrative View',
            collection: 'Evaluations',
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
                {attr: "input_text", title: "input", type: "text", width: 30},
                {attr: "output_text", title: "output", type: "text", width: 30},
                {attr: "model_hash", title: "model", type: "text", width: 30}
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
        const collection = 6;
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
            yield response.sendView('evaluations/create_view', {
                title: 'Create - Singularity',
                process_hash: url_params.process_hash, header: 'Evaluations',
                description: 'Creation View',
                collection: 'Evaluations',
                view: 'Create',
                user_full_name: 'Harvey Bastidas',
                username: url_params.username,
                pass_hash: url_params.pass_hash,
                user_role: 'Administrator',
                items: [
                    {attr: "observations", title: "observations", type: "text", width: 30},
                    {attr: "features", title: "features", type: "text", width: 30},
                    {attr: "resolution", title: "resolution", type: "text", width: 30},
                    {attr: "training_signals", title: "training_signals", type: "text", width: 30},
                    {attr: "model_hash", title: "model_hash", type: "text", width: 30},
                    {attr: "process_hash", title: "process_hash", type: "text", width: 30},
                    {attr: "input_link", title: "input_link", type: "text", width: 30},
                    {attr: "input_text", title: "input_text", type: "text", width: 30},
                    {attr: "input_blob", title: "input_blob", type: "text", width: 30},
                    {attr: "input_hash", title: "input_hash", type: "text", width: 30},
                    {attr: "output_link", title: "output_link", type: "text", width: 30},
                    {attr: "output_text", title: "output_text", type: "text", width: 30},
                    {attr: "output_blob", title: "output_blob", type: "text", width: 30},
                    {attr: "output_hash", title: "output_hash", type: "text", width: 30},
                    {attr: "hash", title: "hash", type: "text", width: 30},
                    {attr: "error", title: "error", type: "text", width: 30},
                    {attr: "evaluator_hash", title: "evaluator_hash", type: "text", width: 30}
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
        const collection = 6;
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
            const result = yield Database.select('*').from('evaluations').where('id', process_hash);
            yield response.sendView('evaluations/update_view', {
                title: 'Edit - Singularity',
                process_hash: url_params.process_hash,
                header: 'Evaluations',
                description: 'Editing View',
                collection: 'Evaluations',
                view: 'Update : ' + result[0].id,
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                pass_hash: url_params.pass_hash,
                data: result,
                hash: result[0].hash,
                username: url_params.username,
                items: [
                    {attr: "observations", title: "observations", type: "text", width: 30},
                    {attr: "features", title: "features", type: "text", width: 30},
                    {attr: "resolution", title: "resolution", type: "text", width: 30},
                    {attr: "training_signals", title: "training_signals", type: "text", width: 30},
                    {attr: "model_hash", title: "model_hash", type: "text", width: 30},
                    {attr: "process_hash", title: "process_hash", type: "text", width: 30},
                    {attr: "input_link", title: "input_link", type: "text", width: 30},
                    {attr: "input_text", title: "input_text", type: "text", width: 30},
                    {attr: "input_blob", title: "input_blob", type: "text", width: 30},
                    {attr: "input_hash", title: "input_hash", type: "text", width: 30},
                    {attr: "output_link", title: "output_link", type: "text", width: 30},
                    {attr: "output_text", title: "output_text", type: "text", width: 30},
                    {attr: "output_blob", title: "output_blob", type: "text", width: 30},
                    {attr: "output_hash", title: "output_hash", type: "text", width: 30},
                    {attr: "hash", title: "hash", type: "text", width: 30},
                    {attr: "error", title: "error", type: "text", width: 30},
                    {attr: "evaluator_hash", title: "evaluator_hash", type: "text", width: 30}
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
        const collection = 6;
        const method = 1;
        var Autho = use('App/Http/Controllers/AuthorizationController');
        var autho = new Autho();
        const autho_res = yield * autho.AuthorizeUser(url_params.username, url_params.process_hash, collection, method);
        if (!autho_res) {
            yield response.sendView('master_JSON', {result: {"error": autho_res, "code": 403}, request_id: 3});
        }

        const Database = use('Database');
        const user_id = request.param('id');
        const result = yield Database.select('*').from('evaluations').where('id', user_id);
        yield response.sendView('evaluations/detail_view', {
            title: 'Details - Singularity',
            process_hash: url_params.process_hash, header: 'Evaluations',
            description: 'Details and Status',
            collection: 'Evaluations',
            view: 'Details: ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            username: url_params.username,
            pass_hash: url_params.pass_hash,
            data: result,
            user_id: user_id,
            items: [
                {attr: "observations", title: "observations", type: "text", width: 30},
                {attr: "features", title: "features", type: "text", width: 30},
                {attr: "resolution", title: "resolution", type: "text", width: 30},
                {attr: "training_signals", title: "training_signals", type: "text", width: 30},
                {attr: "model_hash", title: "model_hash", type: "text", width: 30},
                {attr: "process_hash", title: "process_hash", type: "text", width: 30},
                {attr: "input_link", title: "input_link", type: "text", width: 30},
                {attr: "input_text", title: "input_text", type: "text", width: 30},
                {attr: "input_blob", title: "input_blob", type: "text", width: 30},
                {attr: "input_hash", title: "input_hash", type: "text", width: 30},
                {attr: "output_link", title: "output_link", type: "text", width: 30},
                {attr: "output_text", title: "output_text", type: "text", width: 30},
                {attr: "output_blob", title: "output_blob", type: "text", width: 30},
                {attr: "output_hash", title: "output_hash", type: "text", width: 30},
                {attr: "hash", title: "hash", type: "text", width: 30},
                {attr: "error", title: "error", type: "text", width: 30},
                {attr: "evaluator_hash", title: "evaluator_hash", type: "text", width: 30}
            ]
        });
    }
}
module.exports = EvaluationsController;
    