import { CollaboratorResponse } from "./collaboratorResponse"
import { DocumentResponse } from "./documentResponse"

export type CategoryResponse = {
    id: string,
    name: string,
    isImage: boolean,
    priority: number,
    documents?: DocumentResponse[],
    collaborators?: CollaboratorResponse[]
}