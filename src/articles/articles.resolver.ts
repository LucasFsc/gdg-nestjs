import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GamesService } from '../games/games.service';
import { ArticlesService } from './articles.service';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './schemas/article.schema';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly gamesService: GamesService,
  ) {}

  @Mutation(() => Article)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return this.articlesService.create(createArticleInput);
  }

  @Query(() => [Article], { name: 'articles' })
  findAll() {
    return this.articlesService.findAll();
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.articlesService.findOne(id);
  }

  @Mutation(() => Article)
  updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articlesService.update(
      updateArticleInput.id,
      updateArticleInput,
    );
  }

  @Mutation(() => Article)
  removeArticle(@Args('id', { type: () => String }) id: string) {
    return this.articlesService.remove(id);
  }

  @ResolveField()
  game(@Parent() { game }: Article) {
    return this.gamesService.findOne(game);
  }
}
