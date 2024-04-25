"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.deleteFolder = exports.createFile = exports.createFolder = exports.createCourse = exports.get = void 0;
const query = require("./query");
const data_1 = require("./data");
const tree = require("./tree");
const { QueryTypes } = require('sequelize');
function badRequest(ex, res) {
    res.writeHead(400); // Bad Request
    res.end(ex.toString());
}
function getId(searchParams) {
    if (!searchParams.has('id'))
        throw 'id is required';
    const n = Number(searchParams.get('id'));
    if (!Number.isInteger(n))
        throw 'id not valid';
    return n;
}
async function get(searchParams, res, connection) {
    //try {
    //    const id = getId(searchParams)
    //    connection.query(query.getFolders(id), function (err, folders: Array<Folder>) {
    //        if (err) badRequest(err, res)
    //        else connection.query(query.getFiles(id), function (err, files: Array<File>) {
    //            if (err) badRequest(err, res)
    //            else {
    //                res.writeHead(200)
    //                const arr: Folder[] = tree.createTree(folders, files)
    //                res.end(JSON.stringify(arr))
    //            }
    //        })
    //    })
    //} catch (ex) {
    //    badRequest(ex, res)
    //}
    try {
        const id = getId(searchParams);
        const folders = await connection.query(query.getFolders(id), {
            type: QueryTypes.SELECT
        });
        const files = await connection.query(query.getFiles(id), {
            type: QueryTypes.SELECT
        });
        const arr = tree.createTree(folders, files);
        res.end(JSON.stringify(arr));
    }
    catch (ex) {
        badRequest(ex, res);
    }
}
exports.get = get;
async function createQ(q, res, connection) {
    //connection.query(q, function (err) {
    //    if (err) badRequest(err, res)
    //    else {
    //        res.writeHead(201) // Created
    //        res.end()
    //    }
    //})
    try {
        await connection.query(q);
        res.writeHead(201); // Created
        res.end();
    }
    catch (ex) {
        badRequest(ex, res);
    }
}
function createCourse(fields, res, connection) {
    if (!(0, data_1.isCourse)(fields))
        badRequest('invalid form', res);
    else
        createQ(query.createCourse(fields.id), res, connection);
}
exports.createCourse = createCourse;
function createFolder(fields, res, connection) {
    if (!(0, data_1.isFolder)(fields))
        badRequest('invalid form', res);
    else
        createQ(query.createFolder(fields), res, connection);
}
exports.createFolder = createFolder;
function createFile(fields, res, connection) {
    if (!(0, data_1.isFile)(fields))
        badRequest('invalid form', res);
    else
        createQ(query.createFile(fields), res, connection);
}
exports.createFile = createFile;
async function deleteQ(q, res, connection) {
    //connection.query(q, function (err, result) {
    //    if (err) badRequest(err, res)
    //    else {
    //        res.writeHead((result.affectedRows > 0) ? 202 : 304); // Accepted : Not Modified
    //        res.end()
    //    }
    //});
    try {
        const result = await connection.query(q);
        res.writeHead((result[0].affectedRows > 0) ? 202 : 304); // Accepted : Not Modified
        res.end();
    }
    catch (ex) {
        badRequest(ex, res);
    }
}
function deleteFolder(searchParams, res, connection) {
    try {
        const id = getId(searchParams);
        deleteQ(query.deleteFolder(id), res, connection);
    }
    catch (ex) {
        badRequest(ex, res);
    }
}
exports.deleteFolder = deleteFolder;
function deleteFile(searchParams, res, connection) {
    try {
        const id = getId(searchParams);
        deleteQ(query.deleteFile(id), res, connection);
    }
    catch (ex) {
        badRequest(ex, res);
    }
}
exports.deleteFile = deleteFile;
//# sourceMappingURL=courses.js.map