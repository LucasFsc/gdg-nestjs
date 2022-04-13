import { faker } from '@faker-js/faker';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import crudMock from '../__mocks__/mongose-crud.mock';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { GamesService } from './games.service';
import { Game } from './schemas/game.schema';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: getModelToken(Game.name),
          useValue: crudMock<Game>(Game),
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a game', () => {
      const dto: CreateGameInput = { name: faker.random.word() };

      expect(service.create(dto)).toEqual(dto);
    });
  });

  describe('findAll', () => {
    it('should return a list of game entities', () => {
      expect(service.findAll()).toEqual(expect.any(Array));
    });
  });

  describe('findOne', () => {
    it('should return a game entity by a given id', () => {
      const _id = new ObjectId().toHexString();

      expect(service.findOne(_id)).toEqual({ _id });
    });
  });

  describe('update', () => {
    it('should update a game', () => {
      const newName = faker.random.word();

      const dto: UpdateGameInput = {
        id: new ObjectId().toHexString(),
        name: faker.random.word(),
      };

      const result = service.update(dto.id, { name: newName });

      expect(result).toEqual({
        _id: dto.id,
        name: newName,
      });

      expect((result as unknown as Game).name).not.toBe(dto.name);
    });
  });

  describe('remove', () => {
    it('should remove a game by a given id and return it', () => {
      const _id = new ObjectId().toHexString();

      expect(service.remove(_id)).toEqual({ _id });
    });
  });
});
