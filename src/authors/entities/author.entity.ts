import { Author as AuthorDbStructure } from "@prisma/client";

export class Author implements AuthorDbStructure {
    email: string;
    id: number;
    name: string;
    nationality: string;
}