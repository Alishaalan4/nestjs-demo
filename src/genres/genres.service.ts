import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GenresService {
  private genres = [
    {
      id: 1,
      name: 'Romance',
    },
    {
      id: 2,
      name: 'Mystery',
    },
    {
      id: 3,
      name: 'Adventure',
    },
    {
      id: 4,
      name: 'Historical Fiction',
    },
  ];

  findAll() {
    return this.genres;
  }

  findOne(id: number) {
    const genre = this.genres.find((g) => g.id === id);
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  create(genre: { name: string }) {
    const newGenre = {
      id: this.genres.length > 0 ? Math.max(...this.genres.map((g) => g.id)) + 1 : 1,
      ...genre,
    };
    this.genres.push(newGenre);
    return newGenre;
  }

  update(id: number, genre: { name?: string }) {
    const genreIndex = this.genres.findIndex((g) => g.id === id);

    if (genreIndex === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    this.genres[genreIndex] = {
      ...this.genres[genreIndex],
      ...genre,
    };
    return this.genres[genreIndex];
  }

  delete(id: number) {
    const genreIndex = this.genres.findIndex((g) => g.id === id);

    if (genreIndex === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    const deletedGenre = this.genres[genreIndex];
    this.genres.splice(genreIndex, 1);
    return deletedGenre;
  }
}
