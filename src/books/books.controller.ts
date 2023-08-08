import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { BooksDto, CreateBooksDto, UpdateBooksDto } from './dto/books.dto';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
  @Get()
  async getBooks(): Promise<BooksDto[]> {
    return await this.booksService.getBooks();
  }

  @ApiOperation({ summary: 'Get book by id' })
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<BooksDto> {
    return await this.booksService.getBookById(Number(id));
  }

  @ApiOperation({ summary: 'Create new book' })
  @ApiBody({ type: CreateBooksDto })
  @Post()
  async saveBooks(@Body() body: CreateBooksDto): Promise<BooksDto> {
    const { title, author } = body;
    return await this.booksService.saveBooks(title, author);
  }

  @ApiOperation({ summary: 'Update book by id' })
  @ApiBody({ type: UpdateBooksDto })
  @Put(':id')
  async updateBookById(@Body() body: { title?: string, author?: string }, @Param('id') id: string): Promise<BooksDto> {
    return await this.booksService.updateBookById(Number(id), body);
  } 

  @ApiOperation({ summary: 'Delete book by id' })
  @Delete(':id')
  async deleteBookById(@Param('id') id: string): Promise<BooksDto> {
    return await this.booksService.deleteBookById(Number(id));
  }
}
