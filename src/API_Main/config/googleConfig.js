const dotenv = require('dotenv');
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


dotenv.config({
    path: path.resolve(__dirname, '../environment/development.env') });
//console.log(path.resolve(__dirname, '../environment/development.env'));

//console.log(process.env);
console.log(process.env.GOOGLE_CLIENT_ID)
module.exports = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
};