import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransferDocument = Transfer & Document;

@Schema()
export class Transfer {
  @Prop({ required: true })
  senderAccountId: Types.ObjectId;

  @Prop({ required: true })
  receiverAccountId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
