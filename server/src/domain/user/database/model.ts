import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

import { Transaction } from '@local/domain/transaction/database/model';

export enum UserRole {
  USER,
  ADMIN,
  SUPER_ADMIN,
}

// option 'timestamps: true' automatically creates 'createdAt' and 'updatedAt' fields
@modelOptions({ schemaOptions: { collection: 'user', timestamps: true } })
export class User {
  @prop({ required: true, min: 2, max: 70 })
  public username!: string;

  @prop({ min: 2, max: 70 })
  public firstName?: string;

  @prop({ min: 2, max: 70 })
  public lastName?: string;

  @prop({ required: true, max: 50, unique: true })
  public email!: string;

  @prop({ required: true, min: 8 })
  public password!: string;

  @prop({ min: 2, max: 70 })
  public city?: string;

  @prop({ min: 2, max: 70 })
  public state?: string;

  @prop({ min: 2, max: 70 })
  public country?: string;

  @prop({ min: 2, max: 70 })
  public occupation?: string;

  @prop({ min: 2, max: 70 })
  public phoneNumber?: string;

  @prop({ type: () => [Transaction] })
  public transactions?: Transaction;

  @prop({ enum: UserRole, required: true, default: UserRole.USER })
  public role!: UserRole;
}

export const UserModel = getModelForClass(User);
