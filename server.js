let http = require("http");
let fs = require("fs");
const qs = require('querystring');

let htmlCash = fs.readFileSync("index.html");

http.createServer((request, response) => {

    if (request.method === "GET" && request.url === "/") {
        console.log(request.url);
        console.log(request.method);
        response.end(htmlCash);
    } else if (request.method === "POST") {
        console.log(request.url);
        console.log(request.method);

        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let formData = qs.parse(body.toString());

            fs.readFile("dataOfForm.json", 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let oldJsonFileObj = JSON.parse(data);
                    oldJsonFileObj.push(formData);
                    json = JSON.stringify(oldJsonFileObj);
                    fs.writeFile("dataOfForm.json", json, 'utf8', (err) => {
                        if (err) {
                            throw err;
                        } else {
                            console.log("The data of form was append to json file");
                        }
                    });
                }
            });
        });
        response.end(htmlCash);
    }
}).listen(3000, () => console.log("Server is working"));
