import { PartialType } from '@nestjs/mapped-types';
import { AddAuthorDto } from './add-author.dto';

export class UpdateAuthorDto extends PartialType(AddAuthorDto) { }