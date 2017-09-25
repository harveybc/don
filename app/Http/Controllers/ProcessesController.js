'use strict'

class ProcessesController {
    // Returns a list of metadata for found processes
    * metadataList(request, response) {
        const metadata_list = [
                        {'process_id': 1, 'model_id': 4, 'performance': 0.75543, 'date_optimum': '2017-09-02 05:22:31'},
                        {'process_id': 2, 'model_id': 5, 'performance': 0.81513, 'date_optimum': '2017-09-02 05:20:12'},
                        {'process_id': 3, 'model_id': 2, 'performance': 0.84784, 'date_optimum': '2017-09-02 05:11:54'}
                    ]
        // TODO: 3 es el request id, cambiarlo por el enviado por el cliente o generado al recibir el request
        yield response.sendView('processes/metadataList_JSON', {metadata_list: metadata_list, id: 3})
    }
    
    // Returns the metadata for the <id> process
    * metadataItem(request, response) {
        const metadata_item = {'process_id': 1, 'model_id': 4, 'performance': 0.75543, 'date_optimum': '2017-09-02 05:22:31'}
        const process_id = request.param('id')
        yield response.sendView('processes/metadataItem_JSON', {metadata_item: metadata_item, process_id:process_id,id: 3})
    }
}

module.exports = ProcessesController
    