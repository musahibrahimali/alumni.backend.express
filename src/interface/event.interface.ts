import {Document} from 'mongoose';

export interface EventInterface extends Document{
    readonly _id?: number | string;
    readonly title: string;
    readonly url: string;
    readonly snippet: string;
    readonly details: string;
    readonly date: string;
    readonly logo: string;
}