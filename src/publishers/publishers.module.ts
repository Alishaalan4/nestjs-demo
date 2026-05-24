import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';

@Module({
  providers: [PublishersService],
  controllers: [PublishersController],
  exports: [PublishersService],
})
export class PublishersModule {}
