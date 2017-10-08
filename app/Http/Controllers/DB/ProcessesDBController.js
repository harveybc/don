'use strict'
/** @desc
    Processeses dummy controller for testing database, it uses static test data.
 */
class ProcessesDBController {
    /** @desc Returns a list of metadata for found processes in a view */
    * MetadataList(request, response) {
        const Database = use('Database')
        var parameters = {'app_id':1,'public_key':'PUB_KEY', 'model_id':10,'min_performance':0.5,'max_results':100,'xml':false};
        const result = yield Database.select("*").from('processes').limit(3)
        /** TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request */
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    /** @desc Returns the metadata for the <id> process */
    * MetadataItem(request, response) {
        const Database = use('Database')
        const result = yield Database.select("*").from('processes').where('id',1)
        const process_id = request.param('id')
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
        const result = yield Database.select('*').from('processes').limit(request.param('max_results'))
        const process_id = request.param('id')
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    /** @desc Returns the <id> of the created process */
    * CreateItem(request, response) {
        const Database = use('Database')
        const result = {"id": 4}
        const process_id = request.param('id')
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    /** @desc Returns the <id> of the created process */
    * DeleteItem(request, response) {
        const Database = use('Database')
        const result = {"delete_count": 1}
        const process_id = request.param('id')
        yield response.sendView('master_JSON', {result: result, request_id: 3})
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
    