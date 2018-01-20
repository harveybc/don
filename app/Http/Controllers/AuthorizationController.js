'use strict';
/** @desc
 Authorizations, collection 1
 */
// @TODO: ADICIONAR autorizacion para transacciones, son los mismos clientes?
class AuthorizationController {
    /** @desc searches for the username´s role and verifies if method  in collection c is allowed (defaul:deny all)  */
    * AuthorizeUser(username, c, method) {
        var ret=false;
        var result;
        if (username && c && method) {
            const Database = use('Database');
            result = yield Database.select('role').from('authorizations').where('username', username);
            // @TODO: colocar per-role authorizations desde nueva colección
            // Per role authorizations
            // role==1:admin,2:node,3:optimizer,4:evaluator,5:client
            if (result[0].role === 1) {
                // method==1:GetList/AdminView,2:GetItem/DetailView,3:CreateItem/CreateView,4:UpdateItem/UpdateView,5:DeleteItem
                // collection==1:Authentication,2:Authorization,3:Accounting,4:Applications,5:Processes,6:Models,7:Datasets,8:Parameters,9:Blocks,10:Neighbors,11:Network,12:Evaluations,13:Inputs,14:Outputs
                     if (method===1) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===2) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===3) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===4) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===5) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===6) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}      
            } 
            else if (result[0].role === 2) {
                // method==1:GetList/AdminView,2:GetItem/DetailView,3:CreateItem/CreateView,4:UpdateItem/UpdateView,5:DeleteItem
                // collection==0:Authentication,1:Authorization,2:,3:Accounting,4:Applications,5:Processes,6:Models,7:Datasets,8:Parameters,9:Blocks,10:Neighbors,11:Network,12:Evaluations,13:Inputs,14:Outputs
                   if (method===1) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===2) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===3) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===4) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===5) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===6) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}      
            } 
            else if (result[0].role === 3) {
                // method==1:GetList/AdminView,2:GetItem/DetailView,3:CreateItem/CreateView,4:UpdateItem/UpdateView,5:DeleteItem
                // collection==0:Authentication,1:Authorization,2:,3:Accounting,4:Applications,5:Processes,6:Models,7:Datasets,8:Parameters,9:Blocks,10:Neighbors,11:Network,12:Evaluations,13:Inputs,14:Outputs
                   if (method===1) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===2) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===3) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===4) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===5) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===6) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}      
            } 
            else if (result[0].role === 4) {
                // method==1:GetList/AdminView,2:GetItem/DetailView,3:CreateItem/CreateView,4:UpdateItem/UpdateView,5:DeleteItem
                // collection==0:Authentication,1:Authorization,2:,3:Accounting,4:Applications,5:Processes,6:Models,7:Datasets,8:Parameters,9:Blocks,10:Neighbors,11:Network,12:Evaluations,13:Inputs,14:Outputs
                   if (method===1) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===2) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===3) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===4) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===5) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===6) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}      
            } 
            else if (result[0].role === 5) {
                // method==1:GetList/AdminView,2:GetItem/DetailView,3:CreateItem/CreateView,4:UpdateItem/UpdateView,5:DeleteItem
                // collection==0:Authentication,1:Authorization,2:,3:Accounting,4:Applications,5:Processes,6:Models,7:Datasets,8:Parameters,9:Blocks,10:Neighbors,11:Network,12:Evaluations,13:Inputs,14:Outputs
                   if (method===1) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===2) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===3) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===4) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===5) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}
                else if (method===6) {if ((c===1)||(c===2)||(c===3)||(c===4)||(c===5)||(c===6)||(c===7)||(c===8)||(c===9)||(c===10)||(c===11)||(c===12)||(c===13)||(c===14)) ret=true;}      
            } 
        }
        return ret ;
    }
    /** @desc Returns a list of authorization */
    * GetList(request, response) {
        var url_params= request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=2; const method=1; const auth_res_2 = yield * this.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 
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
        var url_params= request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=2; const method=2; const auth_res_2 = yield * this.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 

        const Database = use('Database');
        const process_id = request.param('id');
        const result = yield Database.select('*').from('authorizations').where('id', process_id);

        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * createItemQuery(request, response) {
        // generate parameters for query
        const Database = use('Database');
        var url_params= request.get();
        const user_name = url_params.user_name;
        const role = url_params.role_key;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const active = url_params.active;
        // @todo TODO: Perform data validation
        // https://adonisjs.com/docs/3.2/validator

        // perform query and send view
        const process_id = yield Database
                .table('authorizations')
                .insert({'username': user_name, 'role': role, 'active': active});
        const result = {"id": process_id};
        return (result);
    }
    /** @desc Returns the <id> of the created process */
    * CreateItem(request, response) {
        var url_params= request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=2; const method=3; const auth_res_2 = yield * this.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 


        var resp;
        result = yield * this.createItemQuery(request, resp);
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    * updateItemQuery(request, response) {

        // generate parameters for query
        const Database = use('Database');
        var url_params= request.get();
        const user_name = url_params.user_name;
        const role = url_params.role_key;
        const created_by = url_params.created_by;
        const updated_by = url_params.updated_by;
        const active = url_params.active;
        //@todo TODO: Perform data validation
        // https://adonisjs.com/docs/3.2/validator
        // perform query and send view
        const affected_rows = yield Database
                .table('authorizations')
                .where('id', request.param('id'))
                .update({'username': user_name, 'role': role, 'active': active});
        const result = {"affected_rows": affected_rows};
        return (result);
    }
    /** @desc Returns the <id> of the created process */
    * UpdateItem(request, response) {
        var url_params= request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=2; const method=4; const auth_res_2 = yield * this.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 

        var resp;
        var result = yield * this.updateItemQuery(request, resp);
        // Accounting layer (402 Error if quota exceeded)
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Returns the <id> of the created process */
    * DeleteItem(request, response) {
        var url_params= request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=2; const method=5; const auth_res_2 = yield * this.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 


        const Database = use('Database');
        const process_id = request.param('id');
        const deleted_count = yield Database.table('authorizations').where('id', process_id).delete();
        const result = {"deleted_count": deleted_count};
        yield response.sendView('master_JSON', {result: result, request_id: 3});
    }
    /** @desc Renders the admin view  */
    * AdminView(request, response, error) {
        var url_params= request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=2; const method=1; const auth_res_2 = yield * this.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 
      
        const Database = use('Database');
        const result = yield Database.select('*').from('authorizations').limit(request.input('max_results'));
        yield response.sendView('authorization/admin_view', {
            title: 'Authorization Admin - Singularity',
            header: 'Authorization',
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
        var url_params= request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=2; const method=2; const auth_res_2 = yield * this.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 
      
        const Database = use('Database');
        const user_id = request.param('id');
        const result = yield Database.select('*').from('authorizations').where('id', user_id);
        yield response.sendView('authorization/detail_view', {
            title: 'User Details - Singularity',
            header: 'Authorization',
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
        var url_params= request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=2; const method=3; const auth_res_2 = yield * this.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 
      
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
                header: 'Authorization',
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
        var url_params= request.get();
        // Authentication layer (401 Error)
        var A = use('App/Http/Controllers/AuthenticationController'); var a = new A(); const auth_res = yield * a.AuthenticateUser(url_params.username, url_params.pass_hash); if (!auth_res) { yield response.sendView('master_JSON', {result: {"error": auth_res, "code":401, "pass_hash": url_params.pass_hash}, request_id: 3});}
        // Authorization layer (403 Error)
        const collection=2; const method=4; const auth_res_2 = yield * this.AuthorizeUser(url_params.username, collection, method); if (!auth_res_2) { yield response.sendView('master_JSON', {result: {"error": auth_res_2, "code":403, "pass_hash": url_params.pass_hash}, request_id: 3});} 

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
            const result = yield Database.select('*').from('authorizations').where('id', process_id);
            yield response.sendView('authorization/update_view', {
                title: 'Edit User - Singularity',
                header: 'Authorization',
                description: 'Editing View',
                collection: 'Authorization',
                view: 'Update : ' + result[0].id,
                user_full_name: 'Harvey Bastidas',
                user_role: 'Administrator',
                process_id: result[0].id,
                pass_hash: url_params.pass_hash,
                data: result, 
                username: url_params.username
            });
        }
    }
}
module.exports = AuthorizationController;
    