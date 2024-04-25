var http = require('http');
var con = require('./connection');
var formidable = require('formidable');
var courses = require('./courses')

const port = 8080

process.on('warning', (warning) => {
    console.log(warning.stack);
});

http.createServer(function (req, res) {
    const notfound = function () {
        res.writeHead(404) // Not Found
        res.end("not found")
    }

    try {
        const url = new URL(req.url, `http://localhost:${port}`)
        switch (req.method) {
            case 'GET': {
                if (url.pathname == '/') {
                    courses.get(url.searchParams, res, con.connection)
                }
                else {
                    notfound()
                }
                break;
            }
            case 'POST': {
                const form = new formidable.IncomingForm();
                switch (url.pathname) {
                    case '/CreateCourse':
                        form.parse(req, function (err, fields) {
                            courses.createCourse(fields, res, con.connection)
                        });
                        break;
                    case '/CreateFolder':
                        form.parse(req, function (err, fields) {
                            courses.createFolder(fields, res, con.connection)
                        });
                        break;
                    case '/CreateFile':
                        form.parse(req, function (err, fields) {
                            courses.createFile(fields, res, con.connection)
                        });
                        break;
                    default:
                        notfound()
                }
                break;
            }
            case 'DELETE': {
                if (url.pathname == '/DeleteFolder') {
                    courses.deleteFolder(url.searchParams, res, con.connection)
                }
                else if (url.pathname == '/DeleteFile') {
                    courses.deleteFile(url.searchParams, res, con.connection)
                }
                else {
                    notfound()
                }
                break;
            }
            default: {
                notfound()
            }
        }
    } catch (ex) {
        res.writeHead(400); // Bad Request
        res.end(ex.toString());
    }
}).listen(port);
console.log(`listening on port: ${port}`)