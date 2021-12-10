import {Document} from 'mongoose';

export interface AdminInterface extends Document{
    readonly _id?: number;
    readonly socialId?: number;
    readonly email: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly displayName?: string;
    readonly password: string;
    readonly image?: string | any;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}