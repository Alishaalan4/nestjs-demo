import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { PublishersService } from '../publishers/publishers.service';
import { GenresService } from '../genres/genres.service';

@Injectable()
export class BooksService {
  private books = [
    {
      id: 1,
      title: 'Pride and Prejudice',
      authorId: 1,
      publisherId: 1,
      genreIds: [1, 4],
    },
    {
      id: 2,
      title: 'Great Expectations',
      authorId: 2,
      publisherId: 2,
      genreIds: [2, 4],
    },
    {
      id: 3,
      title: 'The Adventures of Tom Sawyer',
      authorId: 3,
      publisherId: 3,
      genreIds: [3],
    },
  ];

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly publishersService: PublishersService,
    private readonly genresService: GenresService,
  ) {}

  findAll(includeAuthor?: boolean) {
    if (!includeAuthor) {
      return this.books;
    }

    return this.books.map((book) => ({
      ...book,
      author: this.authorsService.findOne(book.authorId),
    }));
  }

  findOne(id: number, includeAuthor?: boolean) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    if (!includeAuthor) {
      return book;
    }

    return {
      ...book,
      author: this.authorsService.findOne(book.authorId),
    };
  }

  create(book: { title: string; authorId: number; publisherId: number; genreIds: number[] }) {
    // Verify the author and publisher exist
    this.authorsService.findOne(book.authorId);
    this.publishersService.findOne(book.publisherId);

    // Verify all genres exist
    book.genreIds.forEach((genreId) => {
      this.genresService.findOne(genreId);
    });

    const newBook = {
      id: this.books.length > 0 ? Math.max(...this.books.map((b) => b.id)) + 1 : 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, book: { title?: string; authorId?: number; publisherId?: number; genreIds?: number[] }) {
    const bookIndex = this.books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // If authorId is being updated, verify the author exists
    if (book.authorId) {
      this.authorsService.findOne(book.authorId);
    }

    // If publisherId is being updated, verify the publisher exists
    if (book.publisherId) {
      this.publishersService.findOne(book.publisherId);
    }

    // If genreIds are being updated, verify all genres exist
    if (book.genreIds) {
      book.genreIds.forEach((genreId) => {
        this.genresService.findOne(genreId);
      });
    }

    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...book,
    };
    return this.books[bookIndex];
  }

  delete(id: number) {
    const bookIndex = this.books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const deletedBook = this.books[bookIndex];
    this.books.splice(bookIndex, 1);
    return deletedBook;
  }
}

