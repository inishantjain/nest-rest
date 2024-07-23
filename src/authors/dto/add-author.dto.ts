import { Author } from "@prisma/client";

export class AddAuthorDto implements Author {
    email: string;
    id: number;
    name: string;
    nationality: string;
}