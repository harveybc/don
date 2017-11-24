
    /** 
     @param {string} method is the name of the collectionand method, i.e: processes/DeleteItem* 
     @return Array with the parameters for the method  
     * */
    function getTestParameters (method) {
        switch (method) {
            case 'processes/MetadataList':
                ret = {
                    'prefix': '/processes/metadata?',
                    'items': [
                        {'key': 'app_id', 'value': 1},
                        {'key': 'public_key', 'value': 'PUB_KEY'},
                        {'key': 'model_id', 'value': 10},
                        {'key': 'min_performance', 'value': 0.5},
                        {'key': 'max_results', 'value': 100},
                        {'tag': 'tag', 'value': 'forex'},
                        {'key': 'format', 'value': 'jsonrpc2'}
                    ]
                };
                break;
            case 'processes/MetadataItem':
                ret = {
                    'prefix': '/processes/metadata/1?',
                    'items': [
                        {'key': 'app_id', 'value': 1},
                        {'key': 'public_key', 'value': 'PUB_KEY'},
                        {'key': 'format', 'value': 'jsonrpc2'}
                    ]
                };
                break;
            case 'processes/GetList':
                ret = {
                    'prefix': '/processes?',
                    'items': [
                        {'key': 'app_id', 'value': 1},
                        {'key': 'public_key', 'value': 'PUB_KEY'},
                        {'key': 'model_id', 'value': 10},
                        {'key': 'min_performance', 'value': 0.5},
                        {'key': 'max_results', 'value': 100},
                        {'tag': 'tag', 'value': 'forex'},
                        {'key': 'format', 'value': 'jsonrpc2'}
                    ]
                };
                break;
            case 'processes/GetItem':
                ret = {
                    'prefix': '/processes/1?',
                    'items': [
                        {'key': 'app_id', 'value': 1},
                        {'key': 'public_key', 'value': 'PUB_KEY'},
                        {'key': 'format', 'value': 'jsonrpc2'}
                    ]
                };
                break;
            case 'processes/CreateItem':
                ret = {
                    'prefix': '/processes?',
                    'items': [
                        {'key': 'name', 'value': 'TEST4'},
                        {'key': 'description', 'value': 'TEST4_desc'},
                        {'key': 'public_key', 'value': 'PUB_KEY'},
                        {'key': 'tags', 'value': 'forex,NEAT,DQN'},
                        {'key': 'app_id', 'value': 1},
                        {'key': 'active', 'value': true},
                        {'key': 'desired_block_time', 'value': 5 * 60},
                        {'key': 'desired_block_size', 'value': 0},
                        {'key': 'block_time_control', 'value': 'opow'},
                        {'key': 'model_id', 'value': 1},
                        {'key': 'training_id', 'value': 1},
                        {'key': 'validation_id', 'value': 'TEST4'},
                        {'key': 'difficulty', 'value': 0.1},
                        {'key': 'format', 'value': 'jsonrpc2'}
                    ]
                };
                break;
            case 'processes/UpdateItem':
                ret = {
                    'prefix': '/processes/1?',
                    'items': [
                        {'key': 'name', 'value': 'TEST4'},
                        {'key': 'description', 'value': 'TEST4_desc'},
                        {'key': 'public_key', 'value': 'PUB_KEY'},
                        {'key': 'tags', 'value': 'forex,NEAT,DQN'},
                        {'key': 'app_id', 'value': 1},
                        {'key': 'active', 'value': true},
                        {'key': 'desired_block_time', 'value': 5 * 60},
                        {'key': 'desired_block_size', 'value': 0},
                        {'key': 'block_time_control', 'value': 'opow'},
                        {'key': 'model_id', 'value': 1},
                        {'key': 'training_id', 'value': 1},
                        {'key': 'validation_id', 'value': 'TEST4'},
                        {'key': 'difficulty', 'value': 0.1},
                        {'key': 'format', 'value': 'jsonrpc2'}
                    ]
                };
                break;
            case 'processes/DeleteItem':
                ret = {
                    'prefix': '/processes/4?',
                    'items': [
                        {'key': 'app_id', 'value': 1},
                        {'key': 'public_key', 'value': 'PUB_KEY'},
                        {'key': 'format', 'value': 'jsonrpc2'}
                    ]
                };
                break;
                case 'processes/AdminView':
                ret = {
                    'prefix': '/processes/admin?',
                    'items': [
                        {'key': 'app_id', 'value': 1},
                        {'key': 'public_key', 'value': 'PUB_KEY'},
                        {'key': 'format', 'value': 'jsonrpc2'}
                    ]
                };
                break;
        }
        return(ret);
    }
    
module.exports ={
    /** 
     @param {string} method is the name of the collectionand method, i.e: processes/DeleteItem* 
     @return The parameters for the method on REST format 
     */
    getTestParametersREST:function(method) {
        var params = getTestParameters(method);
        // Convierte los parametros al final de la ruta a REST
        // ej: processes/MetadataItem -> processes/metadata/1?param1=1&...
        // adds the prefix to ret, i.e. processess/metadata/1/?
        var ret = params.prefix;
        // for each parameter adds the key from i and the value from i+1
        for (var i = 0, len = params.items.length; i < len; i++) {
            ret = ret + params.items[i].key + "=" + params.items[i].value + "&";
        }
        return(ret);
    }
}