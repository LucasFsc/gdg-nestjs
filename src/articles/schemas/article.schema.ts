import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Game } from '../../games/schemas/game.schema';

export type ArticleDocument = Article & Document;

@Schema()
@ObjectType()
export class Article {
  @Field(() => String)
  _id;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Game' })
  @Field(() => Game)
  game: string;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String)
  slogan: string;

  @Prop()
  @Field(() => String)
  body: string;

  @Prop({ default: new Date() })
  @Field(() => Float)
  createdAt: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
