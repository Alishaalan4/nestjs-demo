import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'List of all authors' })
  @Get()
  findAll() {
    return { authors: this.authorsService.findAll() };
  }

  @ApiOperation({ summary: 'Get an author by ID' })
  @ApiResponse({ status: 200, description: 'Author details' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({ status: 201, description: 'Author created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @Post()
  create(@Body() author: { name: string; email: string }) {
    return this.authorsService.create(author);
  }

  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({ status: 200, description: 'Author updated successfully' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() authorUpdate: { name?: string; email?: string },
  ) {
    return this.authorsService.update(id, authorUpdate);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @ApiResponse({ status: 200, description: 'Author deleted successfully' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.delete(id);
  }
}
