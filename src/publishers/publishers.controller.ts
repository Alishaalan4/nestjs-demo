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
import { PublishersService } from './publishers.service';

@ApiTags('publishers')
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @ApiOperation({ summary: 'Get all publishers' })
  @ApiResponse({ status: 200, description: 'List of all publishers' })
  @Get()
  findAll() {
    return this.publishersService.findAll();
  }

  @ApiOperation({ summary: 'Get a publisher by ID' })
  @ApiResponse({ status: 200, description: 'Publisher details' })
  @ApiResponse({ status: 404, description: 'Publisher not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new publisher' })
  @ApiResponse({ status: 201, description: 'Publisher created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @Post()
  create(@Body() publisher: { name: string; email: string }) {
    return this.publishersService.create(publisher);
  }

  @ApiOperation({ summary: 'Update a publisher' })
  @ApiResponse({ status: 200, description: 'Publisher updated successfully' })
  @ApiResponse({ status: 404, description: 'Publisher not found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() publisher: { name?: string; email?: string },
  ) {
    return this.publishersService.update(id, publisher);
  }

  @ApiOperation({ summary: 'Delete a publisher' })
  @ApiResponse({ status: 200, description: 'Publisher deleted successfully' })
  @ApiResponse({ status: 404, description: 'Publisher not found' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.delete(id);
  }
}
