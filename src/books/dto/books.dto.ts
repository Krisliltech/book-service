import { ApiProperty } from "@nestjs/swagger";

export interface BooksDto {
  id: number;
  title: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
}

export class CreateBooksDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;
}

export class UpdateBooksDto {
  @ApiProperty()
  title?: string;
  
  @ApiProperty()
  author?: string;
}