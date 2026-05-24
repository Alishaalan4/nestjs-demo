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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenresService } from './genres.service';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ status: 200, description: 'List of all genres' })
  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @ApiOperation({ summary: 'Get a genre by ID' })
  @ApiResponse({ status: 200, description: 'Genre details' })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new genre' })
  @ApiResponse({ status: 201, description: 'Genre created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @Post()
  create(@Body() genre: { name: string }) {
    return this.genresService.create(genre);
  }

  @ApiOperation({ summary: 'Update a genre' })
  @ApiResponse({ status: 200, description: 'Genre updated successfully' })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() genre: { name?: string },
  ) {
    return this.genresService.update(id, genre);
  }

  @ApiOperation({ summary: 'Delete a genre' })
  @ApiResponse({ status: 200, description: 'Genre deleted successfully' })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.delete(id);
  }
}
