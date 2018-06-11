let http = require("http");
let fs = require("fs");
//cdconst qs = require('querystring');


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
    
    //readFileProm("index.html","utf8").then((a)=>{(a)})
    

    if (request.method === "GET" && request.url === "/") {
        console.log(request.url);
        console.log(request.method);
        readFileProm("index.html","utf8").then((a)=>{(a)}).toString()
        response.end();
    }

    // if (request.method === "POST") {
    //     console.log(request.url);
    //     console.log(request.method);

    //     let body = [];

    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     }).on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         let str = JSON.stringify(qs.parse(body.toString()), null, "\t");

    //         fs.appendFile("dataOfForm.txt", str, "utf8", (err) => {
    //             if (err) throw err;
    //             console.log('The "data to append" was appended to file!');
    //         });
    //     });
    //     response.end(html);
    // }
}).listen(3000, () => console.log("Server is working"));
