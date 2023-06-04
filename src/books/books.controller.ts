import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksDto } from './dto/books.dto';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(): Promise<BooksDto[]> {
    return await this.booksService.getBooks();
  }
}
