const mongoose = require('mongoose');
require('dotenv').config();

const mongoClient = new mongoose(process.env.MONGODB_URL);

const clientPromise = mongoClient.connect();

const handler = async(e) => {
    try{
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_cOLLECTION);
        const results = await collection.find({});
        return{
            statusCode:200,
            body:JSON.stringify(results),
        }
    }
    catch(error){
        return {statusCode:500, body:error.toString()}
    }
}