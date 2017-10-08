/** @description Tests using stub controllers */
var expect = require('chai').expect;
/** @description Uses http requests to perform the tests */
var request = require('request');
/** @test {ProcessesStub} */
describe('Processes Collection', function () {
    /** @test {ProcessesStub#MetadataList} */
    it('CN01-stub-1: GET stub/processes/metadata (MetadataList)', function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/stub/processes/metadata?';
        var expected_response = '{"jsonrpc": "2.0", "result": [{"id":1, "updated_at": "2017-09-03 05:22:31", "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "difficulty": 0.0009},{"id":2, "updated_at": "2017-09-04 05:22:31", "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "difficulty": 0.0009},{"id":3, "updated_at": "2017-09-05 05:22:31", "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "difficulty": 0.0009}], "id":3}';
        // Assesment
        request.get(endpoint + parameters, function (error, response, body) {
            parsed_body = JSON.parse(body);
            parsed_expected_response = JSON.parse(expected_response);
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
    /** @test {ProcessesStub#MetadataItem} */
    it('CN01-stub-2: GET stub/processes/metadata/<id> (MetadataItem)', function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/stub/processes/metadata/1?';
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
    /** @test {ProcessesStub#GetList} */
    it('CN01-stub-3: GET stub/processes (GetList)', function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/stub/processes?';
        var expected_response = '{"jsonrpc": "2.0", "result": [{"id": 1, "name": "Test process 1", "description": "Test process 1 -  stub testing", "created_at": "2017-09-02 05:22:31", "updated_at": "2017-09-03 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},{"id": 2, "name": "Test process 2", "description": "Test process 2 -  stub testing", "created_at": "2017-09-03 05:22:31", "updated_at": "2017-09-04 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009},{"id": 3, "name": "Test process 3", "description": "Test process 3 -  stub testing", "created_at": "2017-09-04 05:22:31", "updated_at": "2017-09-05 05:22:31", "tags": ["p2p", "forex", "dqn"], "application_id": 2, "last_block_time": 86400, "last_block_size": 2048, "last_optimum_performance": 0.79983, "last_optimum_id": 1, "date_last_optimum": "2017-09-03 06:22:31", "desired_block_time": 85000, "desired_block_size": 0, "block_time_control": 1, "difficulty": 0.0009}], "id":3}';
        // Assesment
        request.get(endpoint + parameters, function (error, response, body) {
            parsed_body = JSON.parse(body);
            parsed_expected_response = JSON.parse(expected_response);
            expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
            done();
        });
    });
    /** @test {ProcessesStub#GetItem} */
    it('CN01-stub-4: GET stub/processes/<id> (GetItem)', function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/stub/processes/1?';
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
    /** @test {ProcessesStub#CreateItem} */
    it('CN01-stub-5: POST stub/processes (CreateItem)', function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&description=TEST&model_id=1&training_id=1&validation_id=1&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/stub/processes?';
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
    /** @test {ProcessesStub#DeleteItem} */
    it('CN01-stub-6: DELETE stub/processes/<id> (DeleteItem)', function (done) {
        // Configuration
        var parameters = 'public_key=PUB_KEY&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/stub/processes/1?';
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
    /** @test {ProcessesStub#EmptyCollection} */
    it('CN01-stub-7: DELETE stub/processes (EmptyCollection)', function (done) {
    // Configuration 
    var parameters = 'public_key=PUB_KEY&xml=false';
    var endpoint = 'http://dev.ingeni-us.com:3338/stub/processes?';
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

