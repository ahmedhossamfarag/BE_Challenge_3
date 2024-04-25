"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.getFolders = exports.deleteFile = exports.deleteFolder = exports.createFile = exports.createFolder = exports.createCourse = exports.tables = void 0;
const tables = [
    `create table if not exists course (
        id int primary key
    );`,
    `create table if not exists folder (
        id int primary key ,
        name varchar(50) ,
        color varchar(15) ,
        course_id int not null ,
        folder_id int ,
        foreign key(course_id) references course(id) on delete cascade ,
        foreign key(folder_id) references folder(id) on delete cascade
    );`,
    `create table if not exists file (
        id int primary key ,
        title varchar(50) ,
        content varchar(50) ,
        folder_id int not null ,
        course_id int not null ,
        foreign key(folder_id) references folder(id) on delete cascade ,
        foreign key(course_id) references course(id) on delete cascade
    );`
];
exports.tables = tables;
function createCourse(id) {
    return `INSERT INTO Course(id) VALUES (${id})`;
}
exports.createCourse = createCourse;
function createFolder(fl) {
    return `INSERT INTO Folder(id, name, color, Course_id, Folder_id) 
    VALUES (${fl.id}, "${fl.name}", "${fl.color}", ${fl.course_id}, ${fl.folder_id ? fl.folder_id : null})`;
}
exports.createFolder = createFolder;
function createFile(fl) {
    return `INSERT INTO File(id, title, content, Folder_id, Course_id) 
    VALUES (${fl.id}, "${fl.title}", "${fl.content}", ${fl.folder_id}, ${fl.course_id})`;
}
exports.createFile = createFile;
function deleteFolder(id) {
    return `DELETE FROM Folder WHERE id = ${id}`;
}
exports.deleteFolder = deleteFolder;
function deleteFile(id) {
    return `DELETE FROM File WHERE id = ${id}`;
}
exports.deleteFile = deleteFile;
function getFolders(id) {
    return `SELECT * FROM Folder WHERE Course_id = ${id}`;
}
exports.getFolders = getFolders;
function getFiles(id) {
    return `SELECT * FROM File WHERE Course_id = ${id}`;
}
exports.getFiles = getFiles;
//# sourceMappingURL=query.js.map