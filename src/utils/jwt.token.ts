import jwt from 'jsonwebtoken';
import config from '../config/config';

export const createToken = (id: number | string) => {
    return jwt.sign({ id }, config.session.JWT_SECRET, {
        expiresIn: config.session.JWT_EXPIRES_IN
    });
}