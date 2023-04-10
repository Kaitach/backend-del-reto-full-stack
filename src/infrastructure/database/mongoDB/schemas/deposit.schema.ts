import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DepositDocument = Deposit & Document;

@Schema()
export class Deposit {

  _id: Types.ObjectId 

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  accountId: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  userId: string;

  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: String,
    required: true,
  })
  reason: string;
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);
