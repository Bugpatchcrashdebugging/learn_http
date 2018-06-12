let http = require("http");
let fs = require("fs");
const qs = require('querystring');


// let promiseReadFile = (path) => { new Promise (
//     (res, rej) => {
//         fs.readFile(path, (err, data) => {
//             if (err) {
//                 rej(err);
//             } else {
//                 res(data);
//             }
//         })
//     })
// }

// promiseReadFile("index.html").then(res =>{console.log(res);
// })

http.createServer((request, response) => {
    function readFileProm(path, coding) {
        return new Promise((res, rej) => {
            fs.readFile(path, coding, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data);
                }
            })
        })
    }

    function writeFileProm(path, data, coding) {
        return new Promise((res, rej) => {
            fs.writeFile(path, data, coding, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data);
                }
            })
        })
    }

    if (request.method === "GET" && request.url === "/") {
        console.log(request.url);
        console.log(request.method);
        readFileProm("index.html", "utf8").then((data) => { response.end(data) });
    } else if (request.method === "POST") {
        console.log(request.url);
        console.log(request.method);

        let body = [];

        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let formData = qs.parse(body.toString());

            readFileProm("dataOfForm.json", "utf8", ).then((data) => {
                let oldJsonFileObj = JSON.parse(data);
                oldJsonFileObj.push(formData);
                json = JSON.stringify(oldJsonFileObj);
                return json;

            }).then((data) => {
                writeFileProm("dataOfForm.json", data, "utf8")
            });

        });
        //readFileProm("index.html", "utf8").then((data) => { response.write(data) });
        response.end();
        
    }
}).listen(3000, () => console.log("Server is working"));
