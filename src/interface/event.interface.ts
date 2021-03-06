import {Document} from 'mongoose';

export interface EventInterface extends Document{
    readonly _id?: number | string;
    readonly title: string;
    readonly details: string;
    readonly date: string;
    readonly image: string | any;
}