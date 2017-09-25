var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function() {
    request('http://localhost:8080' , function(error, response, body) {
        expect(body).to.equal('Hello World');
    });
});
