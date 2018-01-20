/** @description Tests using stub controllers */
var expect = require('chai').expect;
/** @description Uses http requests to perform the tests */
var request = require('request');
/** @test {ProcessesStub} */
describe('API enpoint tests', function () {
    /** @test {ProcessesStub#GetList} */
    it('CN01-1: GET authentication (GetList)', function (done) {
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
    it('CN01-2: GET authentication/<id> (GetItem)', function (done) {
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
    it('CN01-3: POST authentication (CreateItem)', function (done) {
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
        /** @test {ProcessesStub#CreateItem} */
    it('CN01-4: UPDATE authentication/<id>  (UpdateItem)', function (done) {
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
    it('CN01-5: DELETE authentication/<id> (DeleteItem)', function (done) {
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
        /** @test {ProcessesStub#GetList} */
    it('CN02-1: GET authorization (GetList)', function (done) {
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
    it('CN02-2: GET authorization/<id> (GetItem)', function (done) {
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
    it('CN02-3: POST authorization (CreateItem)', function (done) {
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
        /** @test {ProcessesStub#CreateItem} */
    it('CN02-4: UPDATE authorization/<id>  (UpdateItem)', function (done) {
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
    it('CN02-5: DELETE authorization/<id> (DeleteItem)', function (done) {
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
        /** @test {ProcessesStub#GetList} */
    it('CN03-1: GET accounting (GetList)', function (done) {
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
    it('CN03-2: GET accounting/<id> (GetItem)', function (done) {
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
    it('CN03-3: POST accounting (CreateItem)', function (done) {
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
        /** @test {ProcessesStub#CreateItem} */
    it('CN03-4: UPDATE accounting/<id>  (UpdateItem)', function (done) {
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
    it('CN03-5: DELETE accounting/<id> (DeleteItem)', function (done) {
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
        /** @test {ProcessesStub#GetList} */
    it('CN04-1: GET models (GetList)', function (done) {
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
    it('CN04-2: GET models/<id> (GetItem)', function (done) {
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
    it('CN04-3: POST models (CreateItem)', function (done) {
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
        /** @test {ProcessesStub#CreateItem} */
    it('CN04-4: UPDATE models/<id>  (UpdateItem)', function (done) {
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
    it('CN04-5: DELETE models/<id> (DeleteItem)', function (done) {
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
        /** @test {ProcessesStub#GetList} */
    it('CN05-1: GET datasets (GetList)', function (done) {
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
    it('CN05-2: GET datasets/<id> (GetItem)', function (done) {
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
    it('CN05-3: POST datasets (CreateItem)', function (done) {
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
        /** @test {ProcessesStub#CreateItem} */
    it('CN05-4: UPDATE datasets/<id>  (UpdateItem)', function (done) {
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
    it('CN05-5: DELETE datasets/<id> (DeleteItem)', function (done) {
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
        /** @test {ProcessesStub#GetList} */
    it('CN06-1: GET parameters (GetList)', function (done) {
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
    it('CN06-2: GET parameters/<id> (GetItem)', function (done) {
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
    it('CN06-3: POST parameters (CreateItem)', function (done) {
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
        /** @test {ProcessesStub#CreateItem} */
    it('CN06-4: UPDATE parameters/<id>  (UpdateItem)', function (done) {
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
    it('CN06-5: DELETE neighbors/<id> (DeleteItem)', function (done) {
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
        /** @test {ProcessesStub#GetList} */
    it('CN07-1: GET neighbors (GetList)', function (done) {
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
    it('CN07-2: GET neighbors/<id> (GetItem)', function (done) {
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
    it('CN07-3: POST neighbors (CreateItem)', function (done) {
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
        /** @test {ProcessesStub#CreateItem} */
    it('CN07-4: UPDATE neighbors/<id>  (UpdateItem)', function (done) {
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
    it('CN07-5: DELETE neighbors/<id> (DeleteItem)', function (done) {
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
        /** @test {ProcessesStub#GetList} */
    it('CN08-1: GET processes (GetList)', function (done) {
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
    it('CN08-2: GET processes/<id> (GetItem)', function (done) {
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
    it('CN08-3: POST processes (CreateItem)', function (done) {
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
        /** @test {ProcessesStub#CreateItem} */
    it('CN08-4: UPDATE processes/<id>  (UpdateItem)', function (done) {
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
    it('CN08-5: DELETE processes/<id> (DeleteItem)', function (done) {
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
    
});

