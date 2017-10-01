'use strict'

class ProcessesDBController {
    // Returns a list of metadata for found processes
    * MetadataList(request, response) {
        const Database = use('Database')
        const result = yield Database.select("id", "updated_at", "last_block_time", "last_block_size", "last_optimum_performance", "last_optimum_id", "date_last_optimum", "difficulty").from('processes').limit(3)
        // TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    // Returns the metadata for the <id> process
    * MetadataItem(request, response) {
        const Database = use('Database')
        const result = yield Database.select("id", "updated_at", "last_block_time", "last_block_size", "last_optimum_performance", "last_optimum_id", "date_last_optimum", "difficulty").from('processes').where('id',1)
        const process_id = request.param('id')
        yield response.sendView('master_JSON', {result: result[0], request_id: 3})
    }
    // Returns a list of processes
    * GetList(request, response) {
        const result = yield Database.select('*').from('processes').limit(request.param('max_results'))
        // TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    // Returns the the <id> process
    * GetItem(request, response) {
        const result = {"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "created_at": "2017-09-02 05:22:31", "updated_at": "2017-09-03 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009}
        const process_id = request.param('id')
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    // Returns the <id> of the created process
    * CreateItem(request, response) {
        const result = {"id": 4}
        const process_id = request.param('id')
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    // Returns the <id> of the created process
    * DeleteItem(request, response) {
        const result = {"delete_count": 1}
        const process_id = request.param('id')
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
    // Returns the <id> of the created process
    * EmptyCollection(request, response) {
        const result = {"delete_count": 3}
        const process_id = request.param('id')
        yield response.sendView('master_JSON', {result: result, request_id: 3})
    }
}

module.exports = ProcessesDBController
    