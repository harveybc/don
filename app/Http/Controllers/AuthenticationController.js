'use strict';
/** @desc
 Authenticationes dummy controller for testing database, it uses static test data.
 */
class AuthenticationController {
    /** @desc Returns a list of authentication */
    * GetList(request, response) {
        // Authentication
        const User = use('');
        // Authorization
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
        const Database = use('Database');
        const process_id = request.param('id');
        const result = yield Database.select('*').from('authentications').where('id', process_id);
        
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(request, response) {
        // generate parameters for query
        const Database = use('Database');
        const url_params = request.get();
        const name = url_params.name;
        const public_key = url_params.public_key;
        const pass_hash = url_params.pass_hash;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const active = url_params.active;
        // @todo TODO: Perform data validation
        // https://adonisjs.com/docs/3.2/validator

        // perform query and send view
        const process_id = yield Database
                .table('authentications')
                .insert({'name': name, 'public_key': public_key, 'pass_hash': pass_hash
                    , 'created_by': created_by, 'updated_by': updated_by, 'active': active});
        const result = {"id": process_id};
        return (result);
    }
    /** @desc Returns the <id> of the created process */
    * CreateItem(request, response) {
        var resp;
        result = yield * this.createItemQuery(request, resp);
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * updateItemQuery(request, response) {
        // generate parameters for query
        const Database = use('Database');
        const url_params = request.get();
        const name = url_params.name;
        const public_key = url_params.public_key;
        const pass_hash = url_params.pass_hash;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const active = url_params.active;
        //@todo TODO: Perform data validation
        // https://adonisjs.com/docs/3.2/validator
        // perform query and send view
        const affected_rows = yield Database
                .table('authentications')
                .where('id', request.param('id'))
                .update({'name': name, 'public_key': public_key, 'pass_hash': pass_hash
                    , 'created_by': created_by, 'updated_by': updated_by, 'active': active});
        const result = {"affected_rows": affected_rows};
        return (result);
    }
    /** @desc Returns the <id> of the created process */
    * UpdateItem(request, response) {
        // Authentication layer (401 Error)
        if (this.authenticate(public_key, pass_hash)!=1){
            const result = {"error": 401};
            yield response.sendView('master_JSON', {result: result, request_id: 3});
        }
        // Authorization layer (403 Error)
        var resp;
        result = yield * this.updateItemQuery(request, resp);
        // Accounting layer (402 Error if quota exceeded)
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the <id> of the created process */
    * DeleteItem(request, response) {
        const Database = use('Database');
        const process_id = request.param('id');
        const deleted_count = yield Database.table('authentications').where('id', process_id).delete();
        const result = {"deleted_count": deleted_count};
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Renders the admin view  */
    * AdminView(request, response, error) {
        const Database = use('Database');
        const result = yield Database.select('*').from('authentications').limit(request.input('max_results'));
        yield response.sendView('authentication/admin_view', {
            title: 'Authentication Admin - Singularity',
            header: 'Authentication',
            description: 'Administrative View',
            collection: 'Authentication',
            view: 'Admin',
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            error: error,
            data: result
        });
    }
    /** @desc Renders the edit view  */
    * UpdateView(request, response) {
        const process_id = request.param('id');
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

            const result = yield Database.select('*').from('authentications').where('id', process_id);
            yield response.sendView('authentication/update_view', {
                title: 'Edit User - Singularity',
                header: 'Authentication',
                description: 'Editing View',
                collection: 'Authentication',
                view: 'Update : ' + result[0].id,
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                process_id: result[0].id,
                data: result

            });
        }
    }
    /** @desc Renders the create view  */
    * CreateView(request, response) {
        // if GET PARAM redir=TRUE: llama método de update y redirecciona a admin
        if (request.input('redir') == 1) {
            var resp;

            // if response = Ok redirect to admin with ok message
            var testv = yield * this.createItemQuery(request, resp);
            if (testv.id >=0) {
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
                header: 'Authentication',
                description: 'Creation View',
                collection: 'Authentication',
                view: 'Create',
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator'
            });
        }
    }
    /** @desc Renders the edit view  */
    * DetailView(request, response) {
        const Database = use('Database');
        const process_id = request.param('id');
        const result = yield Database.select('*').from('authentications').where('id', process_id);
        yield response.sendView('authentication/detail_view', {
            title: 'User Details - Singularity',
            header: 'Authentication',
            description: 'Details and Status',
            collection: 'Authentication',
            view: 'Details: ' + result[0].id,
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator',
            data: result,
            process_id:process_id
        });
    }
    /** @desc Renders the edit view  */
    * UserView(request, response) {
        const Database = use('Database');
        yield response.sendView('authentication/detail_view', {
            title: 'Dashboard - Singularity',
            header: 'Dashboard',
            description: 'Apps and Authentication',
            collection: 'Authentication',
            view: 'Details: ',
            user_full_name: 'Harvey Bastidas',
            user_role: 'Administrator'
        });
    }
}
module.exports = AuthenticationController;
    