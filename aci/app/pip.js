module.exports.GetMyPublicIP = function(callback) {

    var http = require('http');
    var str = '';
    var options = {
       host: '169.254.169.254',
       headers: {'Metadata': 'true'},
       port: 80,
       timeout: 1000,
       path: '/metadata/instance/network/interface/0/ipv4/ipAddress/0/publicIpAddress?api-version=2017-04-02&format=text',
       method: 'GET'
    };

    var req = http.request(options, function(res) {

         res.on('data', function(body) {
             str += body;
         });

         res.on('end', function() {
             return callback(res.statusCode, str);
         });
    });
    req.on('error', function(error) {
        str += error;
        return callback("500", str);
    });
    req.end();
}
