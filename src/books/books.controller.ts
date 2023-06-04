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

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<BooksDto> {
    return await this.booksService.getBookId(Number(id));
  }

  @Post()
  async saveBooks(@Body() body: { title: string, author: string }): Promise<BooksDto> {
    const { title, author } = body;
    return await this.booksService.saveBooks(title, author);
  }
}
