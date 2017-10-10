/** Tests using controllers with database connection but without AAA */
var expect = require('chai').expect;
/** @description Uses http requests to perform the tests */
var request = require('request');
/** @desc Routes and parameters for the ProcessesStub controller Tests */
require('../../data/params_processes.js');
/** @test {ProcessesDB} 
 * @todo TODO: prueba de REQUEST_ID (debe ser la misma en reqest y response)*/
describe('Processes Collection', function () {
    /** @test {ProcessesDB#MetadataList} */
    it('CN01-DB-1: GET db/processes/metadata (MetadataList)', function (done) {
        // Configuration
        // var parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
        var parameters = getTestParametersREST('MetadataList');
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes/metadata?';
        // Assesment
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // In the database the third process should have a id=3
            expect(resp.result[2].id).to.equal(3);
            done();
        });
    });
    /** @test {ProcessesDB#MetadataItem} */
    it('CN01-DB-2: GET db/processes/metadata/<id> (MetadataItem)', function (done) {
        // Configuration
        // var parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
        var parameters = getTestParametersREST('MetadataItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes/metadata/1?';
        // Assesment  
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // In the database the third process should have a id=1
            expect(resp.result.id).to.equal(1);
            done();
        });
    });
    /** @test {ProcessesDB#GetList} */
    it('CN01-DB-3: GET db/processes (GetList)', function (done) {
        // Configuration
        // var parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
        var parameters = getTestParametersREST('GetList');
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
    it('CN01-DB-4: GET db/processes/<id> (GetItem)', function (done) {
        // Configuration
        // var parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
        var parameters = getTestParametersREST('GetItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes/1?';
        // Assesment  
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // In the database the third process should have a id=1
            expect(resp.result[0].id).to.equal(1);
            done();
        });
    });

    /** @test {ProcessesDB#CreateItem} */
    it('CN01-DB-5: POST db/processes (CreateItem)', function (done) {
        // Configuration
        // var parameters = 'app_id=1&public_key=PUB_KEY&name=TEST4&description=TEST4_desc&model_id=1&training_id=1&validation_id=1&xml=false';
        var parameters = getTestParametersREST('CreateItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes?';
        // Assesment  
        request.post(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // Verify if the result is equal to the expected response. 
            expect(resp.result.id[0]>0).to.be.true;
            done();
        });
    });
    /** @test {ProcessesDB#UpdateItem} */
    it('CN01-DB-6: PATCH db/processes (UpdateItem)', function (done) {
        // Configuration
        //var parameters = 'app_id=1&public_key=PUB_KEY&name=TEST4&description=TEST4_desc&model_id=1&training_id=1&validation_id=1&xml=false';
        var parameters = getTestParametersREST('UpdateItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes?';
        // Assesment  
        request.post(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // Verify if the result is equal to the expected response. 
            expect(resp.result.id[0]>0).to.be.true;
            done();
        });
    });
    /** @test {ProcessesDB#DeleteItem} */
    it('CN01-DB-7: DELETE db/processes/<id> (DeleteItem)', function (done) {
        // Configuration
        // var parameters = 'public_key=PUB_KEY&xml=false';
        var parameters = getTestParametersREST('DeleteItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db/processes/4?';
        // Assesment  
        request.delete(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // Verify if the result is equal to the expected response. 
            expect(resp.result.deleted_count).to.equal(1);
            done();
        });
    });    
    /** @test {ProcessesDB#PureJSON} */
    it('CN01-DB-8: POST json (PureJSON)', function (done) {
        // Configuration
        var parameters = getTestParametersJSON('CreateItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db/json';
        // Assesment  
        request.delete(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // Verify if the result is equal to the expected response. 
            expect(resp.result.deleted_count).to.equal(1);
            done();
        });
    });
    /** @test {ProcessesDB#SOAP} */
    it('CN01-DB-9: POST soap (PureSOAP)', function (done) {
        // Configuration
        var parameters = getTestParametersSOAP('CreateItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db/soap';
        // Assesment  
        request.delete(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // Verify if the result is equal to the expected response. 
            expect(resp.result.deleted_count).to.equal(1);
            done();
        });
    });
});

