'use strict'
/** @desc
    Processeses dummy controller for testing database, it uses static test data.
 */
class ProcessesDBController {
    /** @desc Returns a list of metadata for found processes in a view */
    * MetadataList(request, response) {
        const Database = use('Database')
        const result = yield Database.select('id','name','description','creator_key','tags','app_id','created_at','updated_at').from('processes').limit(3)
        /** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    /** @desc Returns the metadata for the <id> process */
    * MetadataItem(request, response) {
        const Database = use('Database')
        const process_id = request.param('id')
        const result = yield Database.select('id','name','description','creator_key','tags','app_id','created_at','updated_at').from('processes').where('id',process_id)
        yield response.sendView('master_JSON', {result: result[0], request_id: 3})
    }
    /** @desc Returns a list of processes */
    * GetList(request, response) {
        const Database = use('Database')
        const result = yield Database.select('*').from('processes').limit(request.param('max_results'))
        /** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    /** @desc Returns the the <id> process */
    * GetItem(request, response) {
        const Database = use('Database')
        const process_id = request.param('id')
        const result = yield Database.select('*').from('processes').where('id',process_id)
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    /** @desc Returns the <id> of the created process */
    * CreateItem(request, response) { 
        // generate parameters for query
        const Database = use('Database')
        const url_params=request.get()
        const app_id = url_params.app_id
        const public_key = url_params.public_key
        const name = url_params.name
        const description = url_params.description
        const model_id = url_params.model_id
        const training_id = url_params.training_id
        const validation_id = url_params.validation_id
        // perform query and send view
        const process_id = yield Database.table('processes').insert({'app_id':app_id,'creator_key':public_key,
            'name':name,'description':description,'model_id':model_id,'training_set_id':training_id,'validation_set_id':validation_id})
        const result = {"id": process_id}
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    /** @desc Returns the <id> of the created process */
    * DeleteItem(request, response) {
        const Database = use('Database')
        const process_id = request.param('id')
        const deleted_count = yield Database.table.where('id',process_id).delete();
//        const result = {"delete_count": count_deleted};
        yield response.sendView('master_JSON', {result: 1, request_id: 3})
    }
    /** @desc Returns the <id> of the created process */
    * EmptyCollection(request, response) {
        const Database = use('Database')
        const result = {"delete_count": 3}
        const process_id = request.param('id')
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
} 
module.exports = ProcessesDBController
    