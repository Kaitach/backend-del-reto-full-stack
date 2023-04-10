import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  document:number

  @Prop({ required: true })
  password: string;

  @Prop()
  Account: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
