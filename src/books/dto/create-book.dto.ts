import { Book } from "@prisma/client";

export class CreateBookDto implements Book {
    id: number;
    isbn: string;
    title: string;
    authorId: number;
}
