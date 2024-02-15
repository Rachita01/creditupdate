import express from 'express';
import { Credit } from '../model/CreditModel.js';
const router = express.Router();
//Add a book
router.post("/",async(request,response) => {
    try{
        const newCredit = {
            pcname:request.body.name,
            date:request.body.date,
            amount:request.body.amount,
            addedon:request.body.currentDate
        }

        const credit = await Credit.create(newCredit);

        return response.status(201).send(credit)
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})


//Get books list
router.get('/',async(request,response) => {
    try{
        const credits = await Credit.find({});

        return response.status(200).json({
            count:credits.length,
            data:credits
        });
    }
    catch(error){
        console.log(error.message)
        return response.status(500).send({message:error.message})
    }
})

export default router;