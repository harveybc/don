'use strict'

class ProcessesController {
    * headList(request, response) {
        const metadata_list = {
            "num_results": "3",
            "results":
                    [
                        {"process_id": "1", "model_id": "4", "performance": "0.75543", "date_optimum": "2017-09-02 05:22:31"},
                        {"process_id": "2", "model_id": "5", "performance": "0.81513", "date_optimum": "2017-09-02 05:20:12"},
                        {"process_id": "3", "model_id": "2", "performance": "0.84784", "date_optimum": "2017-09-02 05:11:54"}
                    ]
        }
        yield response.sendView('master_old', {metadata_list: metadata_list, id: 3})
    }
}

module.exports = ProcessesController
    