const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = 'mongodb+srv://accomodation:accomodation@cluster0.u5efs.mongodb.net/mernapp?retryWrites=true&w=majority' || process.env.MONGO_URI ;
        const conn = await mongoose.connect( uri)

        console.log(`Mongo db Connected: ${conn.connection.host}`.cyan.underline);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {connectDB, } 