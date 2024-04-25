import { File, Folder } from "./data";

function fillFolder(fld: Folder, folders: Folder[], files: File[]) {
    fld.files = files.filter(f => f.folder_id === fld.id)
    fld.folders = folders.filter(f => f.folder_id === fld.id)
    for (var f of fld.folders)
        fillFolder(f, folders, files)
}

export function createTree(folders: Folder[], files: File[]): Folder[] {
    const tree = folders.filter(f => f.folder_id == null)
    for (var f of tree)
        fillFolder(f, folders, files)
    return tree
}
