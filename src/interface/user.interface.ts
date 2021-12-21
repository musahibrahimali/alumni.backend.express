import {Document} from 'mongoose';

export interface UserInterface extends Document{
  readonly _id?: number;
  readonly socialId?: string;
  readonly email: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly password: string;
  readonly image?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}