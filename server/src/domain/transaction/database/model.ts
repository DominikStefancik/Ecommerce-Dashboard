import { modelOptions, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'transactions', timestamps: true } })
export class Transaction {}

export const transactionModel = getModelForClass(Transaction);
