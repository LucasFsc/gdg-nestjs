import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GameDocument = Game & Document;

@Schema()
@ObjectType()
export class Game {
  @Field()
  _id: string;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop({ default: Date.now() })
  @Field(() => Float)
  createdAt: number;
}

export const GameSchema = SchemaFactory.createForClass(Game);
