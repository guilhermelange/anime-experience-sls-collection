import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule, PrismaService } from '../../common/database';
import { CollectionService } from './collection.service';

describe('CollectionService', () => {
  let service: CollectionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CollectionService],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of collections', async () => {
      prisma.collection.findMany = jest
        .fn()
        .mockResolvedValueOnce([{ id: '1', name: 'Top' }] as any[]);

      prisma.$queryRaw = jest.fn().mockResolvedValueOnce([] as any[]);

      const response = await service.findAll('1');
      expect(response.length).toEqual(1);
      expect(prisma.collection.findMany).toBeCalledTimes(1);
    });

    it('should return a error', async () => {
      prisma.collection.findMany = jest.fn().mockResolvedValueOnce([] as any[]);
      prisma.$queryRaw = jest.fn().mockResolvedValueOnce([] as any[]);

      expect(service.findAll('1')).rejects.toThrowError();
      expect(prisma.collection.findMany).toBeCalledTimes(1);
    });
  });

  describe('findTopCollections', () => {
    it('should return a error', async () => {
      prisma.collection.findMany = jest.fn().mockResolvedValueOnce([] as any[]);
      prisma.$queryRaw = jest.fn().mockResolvedValueOnce([] as any[]);

      expect(service.findTopCollections('1', 'NONE')).rejects.toThrowError();
      expect(prisma.collection.findMany).toBeCalledTimes(0);
    });

    it('should return a list of collections by TOP filter', async () => {
      prisma.collection.findMany = jest
        .fn()
        .mockResolvedValue([{ id: '1', name: 'Top' }] as any[]);
      prisma.$queryRaw = jest.fn().mockResolvedValue([] as any[]);

      const result = await service.findTopCollections('1', 'animes');
      const result2 = await service.findTopCollections('1', 'playlist');

      expect(result.length).toBe(1);
      expect(result2.length).toBe(1);
      expect(prisma.collection.findMany).toBeCalledTimes(2);
    });
  });
});
