import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { CollectionService } from './collection.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CollectionFilter, ResponseCollectionDto } from './dto/collection.dto';

@Controller('collection')
@ApiTags('Collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [ResponseCollectionDto],
  })
  findAll(@Req() request: Request) {
    const { id: userId } = request?.user || { id: '0' };
    return this.collectionService.findAll(userId);
  }

  @Get(':filter')
  @ApiResponse({
    status: 200,
    type: [ResponseCollectionDto],
  })
  @ApiParam({ name: 'filter', enum: CollectionFilter })
  findTop(@Req() request: Request) {
    const { filter } = request.params;
    const { id: userId } = request?.user || { id: '0' };
    return this.collectionService.findTopCollections(userId, filter);
  }
}
