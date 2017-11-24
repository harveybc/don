var expect  = require('chai').expect;
var request = require('request');

var description = 'GET processes metadataList request';
var parameters = 'app_id=forex&public_key=PUB_KEY&model_id=10&min_performance=0.5&max_results=100&xml=false';
var endpoint = 'http://dev.ingeni-us.com:3338/processes/metadata?';
var expected_response = '{"jsonrpc": "2.0", "result": [{"process_id":1,"model_id":4,"performance":0.75543,"date_optimum":"2017-09-02 05:22:31"},{"process_id":2,"model_id":5,"performance":0.81513,"date_optimum":"2017-09-02 05:20:12"},{"process_id":3,"model_id":2,"performance":0.84784,"date_optimum":"2017-09-02 05:11:54"}], "id":3}';

it(description, function(done) {
    request.get(endpoint+parameters , function(error, response, body) {
        parsed_body=JSON.parse(body);
        parsed_expected_response=JSON.parse(expected_response);
        expect(JSON.stringify(parsed_body)).to.equal(JSON.stringify(parsed_expected_response));
        done();
    });
});
