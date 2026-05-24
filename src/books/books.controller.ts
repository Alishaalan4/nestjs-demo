import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() book: { title: string; authorId: number; publisherId: number; genreIds: number[] }) {
    return this.booksService.create(book);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() book: { title?: string; authorId?: number; publisherId?: number; genreIds?: number[] },
  ) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}
