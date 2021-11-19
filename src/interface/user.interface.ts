import {Document} from 'mongoose';

export interface UserInterface extends Document{
  readonly _id?: number;
  readonly email: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly password: string;
}