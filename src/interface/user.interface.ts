import {Document} from 'mongoose';

export interface UserInterface extends Document{
  readonly _id?: number;
  readonly email: string;
  readonly password: string;
}