import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<GameDocument>,
  ) {}

  create(createGameInput: CreateGameInput) {
    return this.gameModel.create(createGameInput);
  }

  findAll() {
    return this.gameModel.find();
  }

  findOne(id: string) {
    return this.gameModel.findById(id);
  }

  update(_id: string, updateGameInput: Partial<UpdateGameInput>) {
    return this.gameModel.updateOne({ _id }, updateGameInput);
  }

  remove(_id: string) {
    return this.gameModel.deleteOne({ _id });
  }
}
