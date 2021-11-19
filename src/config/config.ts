const _port: string | any = process.env.PORT;
const Port : number = parseInt(_port, 10) || 5000;
const DB_URI : string = process.env.MONGODB_URI || 'mongodb://localhost/alumni';

const Host : string = process.env.HOST || 'localhost';


export { Port, DB_URI, Host };
