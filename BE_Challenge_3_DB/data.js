"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFile = exports.isFolder = exports.isCourse = void 0;
function isCourse(obj) {
    return (obj &&
        typeof obj === 'object' &&
        typeof obj['id'] === 'number');
}
exports.isCourse = isCourse;
function isFolder(obj) {
    return (obj &&
        typeof obj === 'object' &&
        typeof obj['id'] === 'number' &&
        typeof obj['name'] === 'string' &&
        typeof obj['color'] === 'string' &&
        typeof obj['course_id'] === 'number' &&
        (typeof obj['folder_id'] === 'number' || typeof obj['folder_id'] === 'undefined'));
}
exports.isFolder = isFolder;
function isFile(obj) {
    return (obj &&
        typeof obj === 'object' &&
        typeof obj['id'] === 'number' &&
        typeof obj['title'] === 'string' &&
        typeof obj['content'] === 'string' &&
        typeof obj['course_id'] === 'number' &&
        typeof obj['folder_id'] === 'number');
}
exports.isFile = isFile;
//# sourceMappingURL=data.js.map