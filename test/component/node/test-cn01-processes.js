var expect  = require('chai').expect;
var request = require('request');
// Variables for test configuration
var description;
var parameters;
var endpoint;
var expected_response;
// Processes collection tests
describe('Processes Collection', function() {
    // Test CN01-1:  GET processes/metadata (metadataList)
    // Configuration
    description = 'CN01-1: GET processes/metadata (MetadataList)';
    parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
    endpoint = 'http://dev.ingeni-us.com:3338/processes/metadata?';
    expected_response = '{"jsonrpc": "2.0", "result": [{"process_id":1,"model_id":4,"performance":0.75543,"date_optimum":"2017-09-02 05:22:31"},{"process_id":2,"model_id":5,"performance":0.81513,"date_optimum":"2017-09-02 05:20:12"},{"process_id":3,"model_id":2,"performance":0.84784,"date_optimum":"2017-09-02 05:11:54"}], "id":3}';
    // Assesment
    it(description, function(done) {
        request.get(endpoint+parameters , function(error, response, body) {
            parsed_body=JSON.parse(body);
            parsed_expected_response=JSON.parse(expected_response);
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
    // Test CN01-2:  GET processes/metadata/<id> request (metadataItem)
    // Configuration
    description = 'CN01-2: GET processes/metadata/<id> (MetadataItem)';
    parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
    endpoint = 'http://dev.ingeni-us.com:3338/processes/metadata/1?';
    expected_response = '{"jsonrpc": "2.0", "result": {"process_id": 1, "model_id": 4, "performance": 0.75543, "date_optimum": "2017-09-02 05:22:31"}, "id":3}';
    // Assesment  
    it(description, function(done) { 
        // Makes request to the endpoint 
        request.get(endpoint+parameters , function(error, response, body) {
            parsed_body=JSON.parse(body);
            parsed_expected_response=JSON.parse(expected_response); 
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
    // Test CN01-3:  GET processes (GetList)
    // Configuration
    description = 'CN01-3: GET processes (GetList)';
    parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
    endpoint = 'http://dev.ingeni-us.com:3338/processes?';
    expected_response = '{"jsonrpc": "2.0", "result": [{"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "creator_key": "CREATOR_KEY", "date": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},            {"id": 2, "name": "Test process 2", "description": "Test process 2 -  stub testing", "creator_key": "CREATOR_KEY", "date": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},            {"id": 3, "name": "Test process 3", "description": "Test process 3 -  stub testing", "creator_key": "CREATOR_KEY", "date": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009}], "id":3}';
    // Assesment
    it(description, function(done) {
        request.get(endpoint+parameters , function(error, response, body) {
            parsed_body=JSON.parse(body);
            parsed_expected_response=JSON.parse(expected_response);
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
    // Test CN01-4:  GET processes<id> request (GetItem)
    // Configuration
    description = 'CN01-4: GET processes/<id> (GetItem)';
    parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
    endpoint = 'http://dev.ingeni-us.com:3338/processes/1?';
    expected_response = '{"jsonrpc": "2.0", "result": {"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "creator_key": "CREATOR_KEY", "date": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009}, "id":3}';
    // Assesment  
    it(description, function(done) { 
        // Makes request to the endpoint 
        request.get(endpoint+parameters , function(error, response, body) {
            parsed_body=JSON.parse(body);
            parsed_expected_response=JSON.parse(expected_response); 
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });    
    // Test CN01-5:  POST processes request (CreateItem)
    // Configuration
    description = 'CN01-5: POST processes (CreateItem)';
    parameters = 'app_id=1&public_key=PUB_KEY&description=TEST&model_id=1&training_id=1&validation_id=1&xml=false';
    endpoint = 'http://dev.ingeni-us.com:3338/processes?';
    expected_response = '{"jsonrpc": "2.0", "result": {"id": 4}, "id":3}';
    // Assesment  
    it(description, function(done) { 
        // Makes request to the endpoint 
        request.post(endpoint+parameters , function(error, response, body) {
            parsed_body=JSON.parse(body);
            parsed_expected_response=JSON.parse(expected_response); 
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });   
    // Test CN01-6:  DELETE processes/<id> request (DeleteItem)
    // Configuration
    description = 'CN01-6: DELETE processes/<id> (DeleteItem)';
    parameters = 'public_key=PUB_KEY&xml=false';
    endpoint = 'http://dev.ingeni-us.com:3338/processes/1?';
    expected_response = '{"jsonrpc": "2.0", "result": {"delete_count": 1}, "id":3}';
    // Assesment  
    it(description, function(done) { 
        // Makes request to the endpoint 
        request.delete(endpoint+parameters , function(error, response, body) {
            parsed_body=JSON.parse(body);
            parsed_expected_response=JSON.parse(expected_response); 
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });   
    // Test CN01-7:  DELETE processes request (EmptyCollection)
    // Configuration 
    description = 'CN01-7: DELETE processes (EmptyCollection)';
    parameters = 'public_key=PUB_KEY&xml=false';
    endpoint = 'http://dev.ingeni-us.com:3338/processes?';
    expected_response = '{"jsonrpc": "2.0", "result": {"delete_count": 3}, "id":3}';
    // Assesment  
    it(description, function(done) { 
        // Makes request to the endpoint 
        request.delete(endpoint+parameters , function(error, response, body) {
            parsed_body=JSON.parse(body);
            parsed_expected_response=JSON.parse(expected_response); 
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });  
});

