import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  type MockBookService = Partial<Record<keyof BooksService, jest.Mock>>;
  let booksController: BooksController;
  let booksService: MockBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue:{
            getBooks: jest.fn(),
            getBookById: jest.fn(),
            saveBooks: jest.fn(),
            updateBookById: jest.fn(),
            deleteBookById: jest.fn()
          }
        }],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<MockBookService>(BooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const mockBooks = [
        { id: 1, title: 'Book 1', author: 'none1'},
        { id: 2, title: 'Book 2', author: 'none2' },
      ];
    
      jest.spyOn(booksService, 'getBooks').mockResolvedValue(mockBooks);

      const result = await booksController.getBooks();

      expect(result).toEqual(mockBooks);
      expect(booksService.getBooks).toHaveBeenCalled();
    });

    it('should return an empty array when no book is found', async () => {
      const mockBooks = [];

      jest.spyOn(booksService, 'getBooks').mockResolvedValue(mockBooks);

      const result = await booksController.getBooks();

      expect(result).toEqual(mockBooks);
      expect(booksService.getBooks).toHaveBeenCalled();
    });
  });

  describe('get Book by id', () => {
    it('should return a book', async () => {
      const id = 1
      const mockBooks = { id, title: 'Book 1', author: 'none1'}

      jest.spyOn(booksService, 'getBookById').mockResolvedValue(mockBooks);
    
      const result = await booksController.getBookById(String(id));
 
      expect(result).toEqual(mockBooks);
      expect(booksService.getBookById).toHaveBeenCalled();
    });
  });

  describe('add a new book', () => {
    it('should return a a book', async () => {
      const id = 1
      const mockRequestBooks = { title: 'Book 1', author: 'none1'}
      const mockResponseBooks = { id, title: 'Book 1', author: 'none1'}

      jest.spyOn(booksService, 'saveBooks').mockResolvedValue( mockResponseBooks );
    
      const result = await booksController.saveBooks( mockRequestBooks);
 
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

      jest.spyOn(booksService, 'updateBookById').mockResolvedValue(mockResponseBooks);
    
      const result = await booksController.updateBookById(mockRequestBooks, String(id));
 
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

      jest.spyOn(booksService, 'deleteBookById').mockResolvedValue(mockResponseBooks);
      const result = await booksController.deleteBookById(String(id));
 
      expect(result.id).toEqual(mockResponseBooks.id);
      expect(result.title).toEqual(mockResponseBooks.title);
      expect(result.author).toEqual(mockResponseBooks.author);
      expect(booksService.deleteBookById).toHaveBeenCalled();
    });
  });
});
