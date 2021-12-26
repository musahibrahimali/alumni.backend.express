import {Document} from 'mongoose';

export interface AdminInterface extends Document{
    readonly _id?: number;
    readonly email: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly displayName?: string;
    readonly password: string;
    readonly phone?: string;
    readonly previousImages?: string[];
    readonly image?: string | any;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}