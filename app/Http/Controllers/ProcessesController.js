'use strict'

class ProcessesController {
    * headList(request, response) {
        const characters = {
            "num_results": "3",
            "results":
                    [
                        {"id": "1", "model_id": "4", "performance": "0.75543", "date_optimum": "2017-09-02 05:22:31"},
                        {"id": "2", "model_id": "5", "performance": "0.81513", "date_optimum": "2017-09-02 05:20:12"},
                        {"id": "3", "model_id": "2", "performance": "0.84784", "date_optimum": "2017-09-02 05:11:54"}
                    ]
        }

        yield response.sendView('welcome', {characters: characters})
    }
}

module.exports = ProcessesController
