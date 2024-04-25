"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTree = void 0;
function fillFolder(fld, folders, files) {
    fld.files = files.filter(f => f.folder_id === fld.id);
    fld.folders = folders.filter(f => f.folder_id === fld.id);
    for (var f of fld.folders)
        fillFolder(f, folders, files);
}
function createTree(folders, files) {
    const tree = folders.filter(f => f.folder_id == null);
    for (var f of tree)
        fillFolder(f, folders, files);
    return tree;
}
exports.createTree = createTree;
//# sourceMappingURL=tree.js.map