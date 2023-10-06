import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  findAll(@Req() request: Request) {
    console.log(request);
    console.log(request?.user);
    const { id: userId } = request?.user || { id: '0' };
    return this.collectionService.findAll(userId);
  }

  @Get(':filter')
  findTop(@Req() request: Request) {
    const { filter } = request.params;
    const { id: userId } = request?.user || { id: '0' };
    return this.collectionService.findTopCollections(userId, filter);
  }
}
