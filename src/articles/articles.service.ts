import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  create(createArticleInput: CreateArticleInput) {
    return this.articleModel.create(createArticleInput);
  }

  findAll() {
    return this.articleModel.find().exec();
  }

  findOne(id: string) {
    return this.articleModel.findById(id).exec();
  }

  update(_id: string, updateArticleInput: Partial<UpdateArticleInput>) {
    return this.articleModel.findByIdAndUpdate(_id, updateArticleInput).exec();
  }

  remove(_id: string) {
    return this.articleModel.findByIdAndDelete(_id).exec();
  }
}
