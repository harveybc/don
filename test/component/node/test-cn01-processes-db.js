/** Tests using controllers with database connection but without AAA */
var expect = require('chai').expect;
var request = require('request');
/** Tests for the Processes collection */ 
describe('Processes Collection', function () {
    // Test CN01-DB-1:  GET db/processes/metadata (metadataList)
    it('CN01-DB-1: GET db/processes/metadata (MetadataList)', function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
        // TODO: Cambiar STUB por DB
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes/metadata?';
        var expected_response = '{"jsonrpc": "2.0", "result": [{"id":1, "updated_at": "2017-09-03 05:22:31", "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "difficulty": 0.0009},{"id":2, "updated_at": "2017-09-04 05:22:31", "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "difficulty": 0.0009},{"id":3, "updated_at": "2017-09-05 05:22:31", "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "difficulty": 0.0009}], "id":3}';
        // Assesment
        request.get(endpoint + parameters, function (error, response, body) {
            parsed_body = JSON.parse(body);
            parsed_expected_response = JSON.parse(expected_response);
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
    // Test CN01-DB-2:  GET db/processes/metadata/<id> request (metadataItem)
    description = 'CN01-DB-2: GET db/processes/metadata/<id> (MetadataItem)';
    it(description, function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
        // TODO: Cambiar STUB por DB
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes/metadata/1?';
        //var expected_response = '{"jsonrpc": "2.0", "result": {"id":1, "updated_at": "2017-09-29 02:17:57", "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "difficulty": 0.0009}, "id":3}';
        var expected_response = '{"jsonrpc": "2.0", "result": {"id":1, "updated_at": "2017-09-03 05:22:31", "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "difficulty": 0.0009}, "id":3}';
        
// metadata='{"jsonrpc": "2.0", "result": {"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "created_at":"2017-09-02 05:22:31", "created_at": "2017-09-02 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2}, "id":3}'
        // Assesment  
        request.get(endpoint + parameters, function (error, response, body) {
            parsed_body = JSON.parse(body);
            parsed_expected_response = JSON.parse(expected_response);
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
    // Test CN01-DB-3:  GET db/processes (GetList)
    description = 'CN01-DB-3: GET db/processes (GetList)';
    it(description, function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
        // TODO: Cambiar STUB por DB
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes?';
        var expected_response = '{"jsonrpc": "2.0", "result": [{"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "created_at": "2017-09-02 05:22:31", "updated_at": "2017-09-03 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},{"id": 2, "name": "Test process 2", "description": "Test process 2 -  stub testing", "created_at": "2017-09-03 05:22:31", "updated_at": "2017-09-04 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},{"id": 3, "name": "Test process 3", "description": "Test process 3 -  stub testing", "created_at": "2017-09-04 05:22:31", "updated_at": "2017-09-05 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009}], "id":3}';
        // Assesment
        request.get(endpoint + parameters, function (error, response, body) {
            parsed_body = JSON.parse(body);
            parsed_expected_response = JSON.parse(expected_response);
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
    
    // Test CN01-DB-4:  GET db/processes<id> request (GetItem)
    description = 'CN01-DB-4: GET db/processes/<id> (GetItem)';
    it(description, function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes/1?';
        var expected_response = '{"jsonrpc": "2.0", "result": {"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "created_at": "2017-09-02 05:22:31", "updated_at": "2017-09-03 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009}, "id":3}';
        // Assesment  
        request.get(endpoint + parameters, function (error, response, body) {
            parsed_body = JSON.parse(body);
            parsed_expected_response = JSON.parse(expected_response);
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done(); 
        });
    });

    // Test CN01-DB-5:  POST db/processes request (CreateItem)
    description = 'CN01-DB-5: POST db/processes (CreateItem)';
    it(description, function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&description=TEST&model_id=1&training_id=1&validation_id=1&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes?';
        var expected_response = '{"jsonrpc": "2.0", "result": {"id": 4}, "id":3}';
        // Assesment  
        request.post(endpoint + parameters, function (error, response, body) {
            parsed_body = JSON.parse(body);
            parsed_expected_response = JSON.parse(expected_response);
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
    // Test CN01-DB-6:  DELETE db/processes/<id> request (DeleteItem)
    description = 'CN01-DB-6: DELETE db/processes/<id> (DeleteItem)';
    it(description, function (done) {
        // Configuration
        var parameters = 'public_key=PUB_KEY&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes/1?';
        var expected_response = '{"jsonrpc": "2.0", "result": {"delete_count": 1}, "id":3}';
        // Assesment  
        request.delete(endpoint + parameters, function (error, response, body) {
            parsed_body = JSON.parse(body);
            parsed_expected_response = JSON.parse(expected_response);
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
    // Test CN01-DB-7:  DELETE db/processes request (EmptyCollection)
    description = 'CN01-DB-7: DELETE db/processes (EmptyCollection)';
    it(description, function (done) {
    // Configuration 
    var parameters = 'public_key=PUB_KEY&xml=false';
    var endpoint = 'http://dev.ingeni-us.com:3338/db/processes?';
    var expected_response = '{"jsonrpc": "2.0", "result": {"delete_count": 3}, "id":3}';
    // Assesment  
        request.delete(endpoint + parameters, function (error, response, body) {
            parsed_body = JSON.parse(body);
            parsed_expected_response = JSON.parse(expected_response);
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
});

