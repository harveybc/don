/** Tests using controllers with database connection but without AAA */
var expect = require('chai').expect;
/** @description Uses http requests to perform the tests */
var request = require('request');
/** @desc Routes and parameters for the AuthenticationStub controller Tests */
var  params=require('../../data/params_authentication.js');
/** @test {AuthenticationDB} 
 * @todo TODO: prueba de REQUEST_ID (debe ser la misma en reqest y response)*/
describe('Authentication Collection', function () {
    /** @test {AuthenticationDB#MetadataList} */
    it('CN01-DB-1: GET authentication/metadata (MetadataList)', function (done) {
        // Configuration
        // var parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
        var parameters = params.getTestParametersREST('authentication/MetadataList');
        var endpoint = 'http://dev.ingeni-us.com:3338/db';
        // Log
        console.log(endpoint + parameters)
        // Assesment
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // In the database the third process should have a id=3
            expect(resp.result[2].id).to.equal(3);
            done();
        });
    });
    /** @test {AuthenticationDB#MetadataItem} */
    it('CN01-DB-2: GET authentication/metadata/<id> (MetadataItem)', function (done) {
        // Configuration
        // var parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
        var parameters = params.getTestParametersREST('authentication/MetadataItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db';
        // Assesment  
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // In the database the third process should have a id=1
            expect(resp.result.id).to.equal(1);
            done();
        });
    });
    /** @test {AuthenticationDB#GetList} */
    it('CN01-DB-3: GET authentication (GetList)', function (done) {
        // Configuration
        // var parameters = 'app_id=1&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
        var parameters = params.getTestParametersREST('authentication/GetList');
        var endpoint = 'http://dev.ingeni-us.com:3338/db';
        // Assesment
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // In the database the third process should have a id=3
            expect(resp.result[2].id).to.equal(3);
            done();
        });
    });

    /** @test {AuthenticationDB#GetItem} */
    it('CN01-DB-4: GET authentication/<id> (GetItem)', function (done) {
        // Configuration
        // var parameters = 'app_id=1&public_key=PUB_KEY&xml=false';
        var parameters = params.getTestParametersREST('authentication/GetItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db';
        // Assesment  
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // In the database the third process should have a id=1
            expect(resp.result[0].id).to.equal(1);
            done();
        });
    });
    /** @test {AuthenticationDB#CreateItem} */
    it('CN01-DB-5: POST authentication (CreateItem)', function (done) {
        // Configuration
        // var parameters = 'app_id=1&public_key=PUB_KEY&name=TEST4&description=TEST4_desc&model_id=1&training_id=1&validation_id=1&xml=false';
        var parameters = params.getTestParametersREST('authentication/CreateItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db';
        // Assesment  
        request.post(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // Verify if the result is equal to the expected response. 
            expect(resp.result.id[0]>0).to.be.true;
            done();
        });
    });
    /** @test {AuthenticationDB#UpdateItem} */
    it('CN01-DB-6: PATCH authentication (UpdateItem)', function (done) {
        // Configuration
        //var parameters = 'app_id=1&public_key=PUB_KEY&name=TEST4&description=TEST4_desc&model_id=1&training_id=1&validation_id=1&xml=false';
        var parameters = params.getTestParametersREST('authentication/UpdateItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db';
        // Assesment  
        request.patch(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // Verify if the result is equal to the expected response. 
            expect(resp.result.id[0]>0).to.be.true;
            done();
        });
    });
    /** @test {AuthenticationDB#DeleteItem} */
    it('CN01-DB-7: DELETE authentication/<id> (DeleteItem)', function (done) {
        // Configuration
        // var parameters = 'public_key=PUB_KEY&xml=false';
        var parameters = params.getTestParametersREST('authentication/DeleteItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/db';
        // Assesment  
        request.delete(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // Verify if the result is equal to the expected response. 
            expect(resp.result.deleted_count).to.equal(1);
            done();
        });
    });  
    /** @test {AuthenticationDB#AdminView} */
    it('CN01-DB-8: GET authentication/admin (AdminView)', function (done) {
        // Configuration
        var parameters = params.getTestParametersREST('authentication/AdminView');
        var endpoint = 'http://dev.ingeni-us.com:3338/db';
        // Assesment  
        request.get(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(response);
            // Verify if the result is equal to the expected response. 
            expect(JSON.stringify(resp)).to.equal(1);
            done();
        });
    });
    /* @todo TODO: HACER PURE-REST Y SOAP REQUESTS AND RESPONSES
     * @test {AuthenticationDB#PureJSON} 
    it('CN01-DB-8: POST json (PureJSON)', function (done) {
        // Configuration
        var parameters = params.getTestParametersJSON('authentication/CreateItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/json';
        // Assesment  
        request.delete(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // Verify if the result is equal to the expected response. 
            expect(resp.result.deleted_count).to.equal(1);
            done();
        });
    });

    it('CN01-DB-9: POST soap (PureSOAP)', function (done) {
        // Configuration
        var parameters = params.getTestParametersSOAP('CreateItem');
        var endpoint = 'http://dev.ingeni-us.com:3338/soap';
        // Assesment  
        request.delete(endpoint + parameters, function (error, response, body) {
            resp = JSON.parse(body);
            // Verify if the result is equal to the expected response. 
            expect(resp.result.deleted_count).to.equal(1);
            done();
        });
    });

*/
});