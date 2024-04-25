import { Folder, File } from './data'

const tables: string[] =
    [
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
    ]

function createCourse(id: number): string {
    return `INSERT INTO Course(id) VALUES (${id})`
}

function createFolder(fl: Folder): string {
    return `INSERT INTO Folder(id, name, color, Course_id, Folder_id) 
    VALUES (${fl.id}, "${fl.name}", "${fl.color}", ${fl.course_id}, ${fl.folder_id ? fl.folder_id : null})`
}

function createFile(fl: File): string {
    return `INSERT INTO File(id, title, content, Folder_id, Course_id) 
    VALUES (${fl.id}, "${fl.title}", "${fl.content}", ${fl.folder_id}, ${fl.course_id})`
}

function deleteFolder(id: number): string {
    return `DELETE FROM Folder WHERE id = ${id}`
}

function deleteFile(id: number): string {
    return `DELETE FROM File WHERE id = ${id}`
}

function getFolders(id: number): string {
    return `SELECT * FROM Folder WHERE Course_id = ${id}`
}

function getFiles(id: number): string {
    return `SELECT * FROM File WHERE Course_id = ${id}`
}

export {
    tables,
    createCourse,
    createFolder,
    createFile,
    deleteFolder,
    deleteFile,
    getFolders,
    getFiles
}