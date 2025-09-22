import { AccordionCollaborator } from "./accordionCollaborator"
import { AccordionContentType } from "./accordionContentType"
import { AccordionDocument } from "./accordionDocument"

export type AccordionContent = {
    categoryName: string,
    type: AccordionContentType,
    documents?: AccordionDocument[],
    collaborators?: AccordionCollaborator[]
}