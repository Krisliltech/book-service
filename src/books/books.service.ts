import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './books.entity';
import { BooksDto } from './dto/books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>
  ) {}

  async getBooks(): Promise<BooksDto[]>{
    const result = await this.bookRepository.find()       
    return result
  }
}
