import { ServerResponse } from "http";
import query = require('./query')
import { File, Folder, isCourse, isFile, isFolder } from './data'
import tree = require('./tree')
import { connect } from "http2";
const { QueryTypes } = require('sequelize');
function badRequest(ex: any, res: ServerResponse) {
    res.writeHead(400); // Bad Request
    res.end(ex.toString());
}

function getId(searchParams: URLSearchParams): number {
    if (!searchParams.has('id'))
        throw 'id is required'
    const n = Number(searchParams.get('id'))
    if (!Number.isInteger(n))
        throw 'id not valid'
    return n
}

async function get(searchParams: URLSearchParams, res: ServerResponse, connection: any) {
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
        const id = getId(searchParams)
        const folders = await connection.query(query.getFolders(id), {
            type: QueryTypes.SELECT
        });
        const files = await connection.query(query.getFiles(id), {
            type: QueryTypes.SELECT
        });
        const arr: Folder[] = tree.createTree(folders, files)
        res.end(JSON.stringify(arr))
    } catch (ex) {
        badRequest(ex, res)
    }
}

async function createQ(q: string, res: ServerResponse, connection: any) {
    //connection.query(q, function (err) {
    //    if (err) badRequest(err, res)
    //    else {
    //        res.writeHead(201) // Created
    //        res.end()
    //    }
    //})
    try {
        await connection.query(q);
        res.writeHead(201) // Created
        res.end()
    } catch (ex) {
        badRequest(ex, res)
    }
}

function createCourse(fields: any, res: ServerResponse, connection: any) {
    if (!isCourse(fields)) badRequest('invalid form', res)
    else createQ(query.createCourse(fields.id), res, connection)
}

function createFolder(fields: any, res: ServerResponse, connection: any) {
    if (!isFolder(fields)) badRequest('invalid form', res)
    else createQ(query.createFolder(fields), res, connection)
}

function createFile(fields: any, res: ServerResponse, connection: any) {
    if (!isFile(fields)) badRequest('invalid form', res)
    else createQ(query.createFile(fields), res, connection)
}

async function deleteQ(q: string, res: ServerResponse, connection: any) {
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
        res.end()
    } catch (ex) {
        badRequest(ex, res)
    }
}

function deleteFolder(searchParams: URLSearchParams, res: ServerResponse, connection: any) {
    try {
        const id = getId(searchParams)
        deleteQ(query.deleteFolder(id), res, connection)
    } catch (ex) {
        badRequest(ex, res)
    }
}

function deleteFile(searchParams: URLSearchParams, res: ServerResponse, connection: any) {
    try {
        const id = getId(searchParams)
        deleteQ(query.deleteFile(id), res, connection)
    } catch (ex) {
        badRequest(ex, res)
    }
}

export {
    get,
    createCourse,
    createFolder,
    createFile,
    deleteFolder,
    deleteFile
}
