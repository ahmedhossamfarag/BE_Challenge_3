export interface Course {
    id: number
}

export function isCourse(obj: unknown): obj is Course {
    return (
        obj &&
        typeof obj === 'object' &&
        typeof obj['id'] === 'number'
    )
}

export type Folder = {
    id: number,
    name: string,
    color: string,
    course_id: number,
    folder_id: number | null,
    folders: Folder[] | undefined,
    files: File[] | undefined
}

export function isFolder(obj: unknown): obj is Folder {
    return (
        obj &&
        typeof obj === 'object' &&
        typeof obj['id'] === 'number' &&
        typeof obj['name'] === 'string' &&
        typeof obj['color'] === 'string' &&
        typeof obj['course_id'] === 'number' &&
        (typeof obj['folder_id'] === 'number' || typeof obj['folder_id'] === 'undefined')
    )
}

export type File = {
    id: number,
    title: string,
    content: string,
    folder_id: number,
    course_id: number
}

export function isFile(obj: unknown): obj is File {
    return (
        obj &&
        typeof obj === 'object' &&
        typeof obj['id'] === 'number' &&
        typeof obj['title'] === 'string' &&
        typeof obj['content'] === 'string' &&
        typeof obj['course_id'] === 'number' &&
        typeof obj['folder_id'] === 'number'
    )
}

