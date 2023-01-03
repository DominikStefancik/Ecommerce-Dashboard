import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

import { Transaction } from '@local/domain/transaction/database/model';

export enum UserRole {
  USER,
  ADMIN,
  SUPER_ADMIN,
}

// option 'timestamps: true' automatically creates 'createdAt' and 'updatedAt' fields
@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class User {
  @prop({ required: true, minlength: 2, maxlength: 70 })
  public username!: string;

  @prop({ minlength: 2, maxlength: 70 })
  public firstName?: string;

  @prop({ minlength: 2, maxlength: 70 })
  public lastName?: string;

  @prop({ required: true, maxlength: 50, unique: true })
  public email!: string;

  @prop({ required: true, minlength: 6 })
  public password!: string;

  @prop({ minlength: 2, maxlength: 70 })
  public city?: string;

  @prop({ minlength: 1, maxlength: 70 })
  public state?: string;

  @prop({ minlength: 2, maxlength: 70 })
  public country?: string;

  @prop({ minlength: 2, maxlength: 70 })
  public occupation?: string;

  @prop({ minlength: 2, maxlength: 70 })
  public phoneNumber?: string;

  @prop({ type: () => [String] })
  public transactions?: Transaction[];

  @prop({ enum: UserRole, required: true, default: UserRole.USER })
  public role!: UserRole;
}

export const UserModel = getModelForClass(User);
