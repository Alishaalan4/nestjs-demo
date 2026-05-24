import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  private books = [
    {
      id: 1,
      title: 'Pride and Prejudice',
      authorId: 1,
    },
    {
      id: 2,
      title: 'Great Expectations',
      authorId: 2,
    },
    {
      id: 3,
      title: 'The Adventures of Tom Sawyer',
      authorId: 3,
    },
  ];

  constructor(private readonly authorsService: AuthorsService) {}

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  create(book: { title: string; authorId: number }) {
    // Verify the author exists
    this.authorsService.findOne(book.authorId);

    const newBook = {
      id: this.books.length > 0 ? Math.max(...this.books.map((b) => b.id)) + 1 : 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, book: { title?: string; authorId?: number }) {
    const bookIndex = this.books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // If authorId is being updated, verify the author exists
    if (book.authorId) {
      this.authorsService.findOne(book.authorId);
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

