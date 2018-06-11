let http = require("http");
let fs = require("fs");
const qs = require('querystring');


let html = fs.readFileSync("index.html");

http.createServer((request, response) => {

    if (request.method === "GET" && request.url === "/") {
        console.log(request.url);
        console.log(request.method);
        response.end(html);
    }

    if (request.method === "POST") {
        console.log(request.url);
        console.log(request.method);

        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let str = JSON.stringify(qs.parse(body.toString()), null, "\t");

            fs.appendFile("dataOfForm.txt", str, "utf8", (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
        });
        response.end(html);
    }
}).listen(3000, () => console.log("Server is working"));
