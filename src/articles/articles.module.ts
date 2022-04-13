import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesModule } from '../games/games.module';
import { ArticlesResolver } from './articles.resolver';
import { ArticlesService } from './articles.service';
import { Article, ArticleSchema } from './schemas/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    GamesModule,
  ],
  providers: [ArticlesResolver, ArticlesService],
})
export class ArticlesModule {}
