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

  async getBookId(id:number): Promise<BooksDto>{
    const result = await this.bookRepository.findOne({
      where: { id }
    })

    if (!result) {
      throw new HttpException(`The book with id: ${id} was not found`, HttpStatus.NOT_FOUND);
    }
    return result
  }

  async saveBooks(title: string, author: string): Promise<BooksDto> {
    if (!title || !author) {
      throw new HttpException('title or author can not be empty', HttpStatus.BAD_REQUEST);
    }
    
    const dataInDB = await this.bookRepository.findOne({
       where: { title }
    })
    if (dataInDB) {
      throw new HttpException(`${title} book already exist`, HttpStatus.CONFLICT);
    }
         
    const dataToDB =  {
      title,
      author,
    }
    const result = await this.bookRepository.save(dataToDB)
    return result  
  }

  async updateBookId(id:number, data: {title: string, author: string}): Promise<BooksDto>{
    if(!data.title && !data.author){
        throw new HttpException('An update field is required', HttpStatus.BAD_REQUEST); 
    }
    const dataInDB = await this.getBookId(id)
    const dataToDB =  {
      id: dataInDB.id,
      title: data.title || dataInDB.title,
      author: data.author || dataInDB.author,
      updatedAt: new Date().toISOString()
    }
  
    const result = await this.bookRepository.save(dataToDB)
    return result
  }
}
