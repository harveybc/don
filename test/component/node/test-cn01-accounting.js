/** @description Tests using stub controllers */
var expect = require('chai').expect;
/** @description Uses http requests to perform the tests */
var request = require('request');
/** @test {ProcessesStub} */
describe('I-NO3: Accounting Collection Sub Tests', function () {
    /** @test {ProcessesStub#MetadataList} */
    it('SubTest-1: Optimization Method Not OPoW', function (done) {
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
    it('SubTest-2: Collection Not 8', function (done) {
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
    it('SubTest-3: Performance is less than last one (fixed 0.8)', function (done) {
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
    it('SubTest-4: OPoW,Collection=8,Method=4,Perf=0.9,', function (done) {
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
});

