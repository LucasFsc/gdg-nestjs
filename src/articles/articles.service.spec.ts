import faker from '@faker-js/faker';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import crudMock from '../__mocks__/mongose-crud.mock';
import { ArticlesService } from './articles.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './schemas/article.schema';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getModelToken(Article.name),
          useValue: crudMock<Article>(Article),
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a article', () => {
      const dto: CreateArticleInput = {
        game: new ObjectId().toHexString(),
        body: faker.random.words(),
        slogan: faker.random.words(),
        title: faker.random.words(),
      };

      expect(service.create(dto)).toEqual(dto);
    });
  });

  describe('findAll', () => {
    it('should return a list of article entities', () => {
      expect(service.findAll()).toEqual(expect.any(Array));
    });
  });

  describe('findOne', () => {
    it('should return a article entity by a given id', () => {
      const _id = new ObjectId().toHexString();

      expect(service.findOne(_id)).toEqual({ _id });
    });
  });

  describe('update', () => {
    it('should update a article', () => {
      const newSlogan = faker.random.word();

      const dto: UpdateArticleInput = {
        id: new ObjectId().toHexString(),
        game: new ObjectId().toHexString(),
        body: faker.random.words(),
        slogan: faker.random.words(),
        title: faker.random.words(),
      };

      const result = service.update(dto.id, { slogan: newSlogan });

      expect(result).toEqual({
        _id: dto.id,
        slogan: newSlogan,
      });

      expect((result as unknown as Article).slogan).not.toBe(dto.slogan);
    });
  });

  describe('remove', () => {
    it('should remove a article by a given id and return it', () => {
      const _id = new ObjectId().toHexString();

      expect(service.remove(_id)).toEqual({ _id });
    });
  });
});
