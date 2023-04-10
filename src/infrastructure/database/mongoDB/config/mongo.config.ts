import { Injectable } from "@nestjs/common";
import { MongooseOptionsFactory, MongooseModuleOptions } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb+srv://admin:admin@cluster0.mdz3crh.mongodb.net/?retryWrites=true&w=majority',
    };
  }
}

