import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @Field(() => String, { description: "game's id" })
  game: string;

  @Field(() => String, { description: "article's title" })
  title: string;

  @Field(() => String, { description: "article's slogan" })
  slogan: string;

  @Field(() => String, { description: "articles's body" })
  body: string;
}
