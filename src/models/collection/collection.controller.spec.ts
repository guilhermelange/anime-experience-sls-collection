import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../common/database/prisma.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { Request } from 'express';

describe('CollectionController', () => {
  let controller: CollectionController;
  let service: CollectionService;
  let mockRequest: Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CollectionController],
      providers: [CollectionService],
    }).compile();

    mockRequest = { user: { id: '1' } } as Request;
    controller = module.get<CollectionController>(CollectionController);
    service = module.get<CollectionService>(CollectionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of collections', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([{}] as any[]);

      const result = await controller.findAll(mockRequest);

      expect(result.length).toEqual(1);
      expect(service.findAll).toBeCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith(mockRequest.user.id);
    });
  });

  describe('findTop', () => {
    it('should return an array of collections by filter', async () => {
      jest
        .spyOn(service, 'findTopCollections')
        .mockResolvedValueOnce([{}] as any[]);

      mockRequest.params = { filter: 'ANIME' };
      const result = await controller.findTop(mockRequest);

      expect(result.length).toEqual(1);
      expect(service.findTopCollections).toBeCalledTimes(1);
      expect(service.findTopCollections).toHaveBeenCalledWith(
        mockRequest.user.id,
        'ANIME',
      );
    });
  });
});
