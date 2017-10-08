/** Tests using controllers with database connection but without AAA */
var expect = require('chai').expect;
/** @description Uses http requests to perform the tests */
var request = require('request');
/** @test {ProcessesDB} 
 * @todo TODO: prueba de REQUEST_ID (debe ser la misma en reqest y response)*/
describe('Processes Collection', function () {
    /** @test {ProcessesDB#MetadataList} */
    it('CN01-DB-1: GET db/processes/metadata (MetadataList)', function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes/metadata?';
        // Assesment
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(response);
            // In the database the third process should have a id=3
            expect(resp.result[2].id).to.equal(3);
            done();
        });
    });
    /** @test {ProcessesDB#MetadataItem} */
    description = 'CN01-DB-2: GET db/processes/metadata/<id> (MetadataItem)';
    it(description, function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes/metadata/1?';
        // Assesment  
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // In the database the third process should have a id=1
            expect(resp.result[2].id).to.equal(1);
            done();
        });
    });
    /** @test {ProcessesDB#GetList} */
    description = 'CN01-DB-3: GET db/processes (GetList)';
    it(description, function (done) {
        // Configuration
        var parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes?';
        // Assesment
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // In the database the third process should have a id=3
            expect(resp.result[2].id).to.equal(3);
            done();
        });
    });
    
    /** @test {ProcessesDB#GetItem} */
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

    /** @test {ProcessesDB#CreateItem} */
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
    /** @test {ProcessesDB#DeleteItem} */
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
    /** @test {ProcessesDB#EmptyCollection} */
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

