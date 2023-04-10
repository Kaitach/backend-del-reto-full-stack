import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
 
  @Prop({
    type: String,
  })
  type: string;
  @Prop({
    type: String,
  })
  userID: string;
  @Prop({
    type: Number,
  })
  amount: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
