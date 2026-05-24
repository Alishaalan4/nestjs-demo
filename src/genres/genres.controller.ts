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
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.findOne(id);
  }

  @Post()
  create(@Body() genre: { name: string }) {
    return this.genresService.create(genre);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() genre: { name?: string },
  ) {
    return this.genresService.update(id, genre);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.delete(id);
  }
}
