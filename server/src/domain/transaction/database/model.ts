import { modelOptions, getModelForClass, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'transactions', timestamps: true } })
export class Transaction {
  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public cost!: number;

  @prop({ required: true, type: () => [String] })
  public products!: string[];
}

export const TransactionModel = getModelForClass(Transaction);
