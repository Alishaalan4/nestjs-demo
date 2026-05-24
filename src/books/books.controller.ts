import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BooksService } from './books.service';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiQuery({ name: 'includeAuthor', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'List of all books' })
  @Get()
  findAll(@Query('includeAuthor', new ParseBoolPipe({ optional: true })) includeAuthor?: boolean) {
    return this.booksService.findAll(includeAuthor);
  }

  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiQuery({ name: 'includeAuthor', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Book details' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('includeAuthor', new ParseBoolPipe({ optional: true })) includeAuthor?: boolean,
  ) {
    return this.booksService.findOne(id, includeAuthor);
  }

  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Book created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @Post()
  create(@Body() book: { title: string; authorId: number; publisherId: number; genreIds: number[] }) {
    return this.booksService.create(book);
  }

  @ApiOperation({ summary: 'Update a book' })
  @ApiResponse({ status: 200, description: 'Book updated successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() book: { title?: string; authorId?: number; publisherId?: number; genreIds?: number[] },
  ) {
    return this.booksService.update(id, book);
  }

  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}}
