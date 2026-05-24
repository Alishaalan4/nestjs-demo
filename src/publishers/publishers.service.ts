import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PublishersService {
  private publishers = [
    {
      id: 1,
      name: 'Penguin Books',
      email: 'contact@penguin.com',
    },
    {
      id: 2,
      name: 'HarperCollins',
      email: 'contact@harpercollins.com',
    },
    {
      id: 3,
      name: 'Simon & Schuster',
      email: 'contact@simonschuster.com',
    },
  ];

  findAll() {
    return this.publishers;
  }

  findOne(id: number) {
    const publisher = this.publishers.find((pub) => pub.id === id);
    if (!publisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return publisher;
  }

  create(publisher: { name: string; email: string }) {
    const newPublisher = {
      id: this.publishers.length > 0 ? Math.max(...this.publishers.map((p) => p.id)) + 1 : 1,
      ...publisher,
    };
    this.publishers.push(newPublisher);
    return newPublisher;
  }

  update(id: number, publisher: { name?: string; email?: string }) {
    const publisherIndex = this.publishers.findIndex((pub) => pub.id === id);

    if (publisherIndex === -1) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }

    this.publishers[publisherIndex] = {
      ...this.publishers[publisherIndex],
      ...publisher,
    };
    return this.publishers[publisherIndex];
  }

  delete(id: number) {
    const publisherIndex = this.publishers.findIndex((pub) => pub.id === id);

    if (publisherIndex === -1) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }

    const deletedPublisher = this.publishers[publisherIndex];
    this.publishers.splice(publisherIndex, 1);
    return deletedPublisher;
  }
}
