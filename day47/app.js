const http = require('http');

const handleRequest = (request, response) => {
    if (request.url === '/currenttime'){
        response.statusCode = 200;
        response.end('<h1>' + new Date().toISOString() + '</h1>');
    } else {
        response.statusCode = 200;
        response.end('<h1>Hello World!</h1>');
    }
};

const server = http.createServer(handleRequest);

console.log("Port 3000");
server.listen(3000);