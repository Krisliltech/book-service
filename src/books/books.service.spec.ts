import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { BookEntity } from './books.entity';
import { BooksService } from './books.service';

describe('BooksService', () => {
  type MockBookEntityRepository = Partial<Record<keyof Repository<BookEntity>, jest.Mock>>;
  let booksService: BooksService;
  let bookEntityRepository: MockBookEntityRepository


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BooksService,
          useValue:{
                getBooks: jest.fn(),
                getBookById: jest.fn(),
                saveBooks: jest.fn(),
                updateBookById: jest.fn(),
                deleteBookById: jest.fn(),
                find: jest.fn()
          }
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    bookEntityRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn()
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const mockBooks = [
        { id: 1, title: 'Mock Book 1', author: 'Mock Author 1' },
        { id: 2, title: 'Mock Book 2', author: 'Mock Author 2' },
      ];

      jest.spyOn(booksService, 'getBooks').mockResolvedValue(mockBooks);

      const books = await booksService.getBooks();

      expect(books).toEqual(mockBooks);
      expect(booksService.getBooks).toHaveBeenCalled();
    });

    it('should return an empty array when no book is found', async () => {
      const mockBooks = [];

      jest.spyOn(booksService, 'getBooks').mockResolvedValue(mockBooks);

      const result = await booksService.getBooks();

      expect(result).toEqual(mockBooks);
      expect(booksService.getBooks).toHaveBeenCalled();
    });
  });

  describe('get Book by id', () => {
    it('should return a book', async () => {
      const id = 1
      const mockBooks = { id, title: 'Book 1', author: 'none1'}

      bookEntityRepository.findOne.mockResolvedValue(id)
      jest.spyOn(bookEntityRepository, 'findOne').mockResolvedValue(mockBooks);
      jest.spyOn(booksService, 'getBookById').mockResolvedValue(mockBooks);
    
      const result = await booksService.getBookById(id);
    
      expect(result.id).toEqual(mockBooks.id);
      expect(result.author).toEqual(mockBooks.author);
      expect(result.title).toEqual(mockBooks.title);
      expect(booksService.getBookById).toHaveBeenCalled();
    });
  });

  describe('add a new book', () => {
    it('should return a book', async () => {
      const id = 1
      const title = 'Book 1'
      const author = 'none1'
      const mockResponseBooks = { id, title, author}

      jest.spyOn(booksService, 'saveBooks').mockResolvedValue( mockResponseBooks );
    
      const result = await booksService.saveBooks( title, author);
 
      expect(result.id).toEqual(mockResponseBooks.id);
      expect(result.title).toEqual(mockResponseBooks.title);
      expect(result.author).toEqual(mockResponseBooks.author);
      expect(booksService.saveBooks).toHaveBeenCalled();
    });
  });

  describe('update book by id', () => {
    it('should return the updated book', async () => {
      const id = 1
      const mockRequestBooks = { title: 'Book 1', author: 'none1'}
      const mockResponseBooks = { id, title: 'Book 1', author: 'none1'}

      bookEntityRepository.findOne.mockResolvedValue(mockResponseBooks)
      jest.spyOn(booksService, 'getBookById').mockResolvedValue(mockResponseBooks);
      jest.spyOn(booksService, 'updateBookById').mockResolvedValue(mockResponseBooks);
    
      const result = await booksService.updateBookById(id, mockRequestBooks);
 
      expect(result.id).toEqual(mockResponseBooks.id);
      expect(result.title).toEqual(mockResponseBooks.title);
      expect(result.author).toEqual(mockResponseBooks.author);
      expect(booksService.updateBookById).toHaveBeenCalled();
    });
  });

  describe('delete book by id', () => {
    it('should return the deleted book', async () => {
      const id = 1
      const mockResponseBooks = { id, title: 'Book 1', author: 'none1'}

      bookEntityRepository.findOne.mockResolvedValue(mockResponseBooks)
      jest.spyOn(booksService, 'getBookById').mockResolvedValue(mockResponseBooks);
      jest.spyOn(booksService, 'deleteBookById').mockResolvedValue(mockResponseBooks);

      const result = await booksService.deleteBookById(id);
 
      expect(result.id).toEqual(mockResponseBooks.id);
      expect(result.title).toEqual(mockResponseBooks.title);
      expect(result.author).toEqual(mockResponseBooks.author);
      expect(booksService.deleteBookById).toHaveBeenCalled();
    });
  });
});
