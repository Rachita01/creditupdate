const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://rachita31:Micro1234@mernapp.r9yo94d.mongodb.net/creditupdate?retryWrites=true&w=majority")

// Schema and Model

  const dataSchema = new mongoose.Schema({
    pcname:String,
    date:String,
    amount:String,
    addedon:String
  })
 
  const PCData = mongoose.model('PCData',dataSchema);
  

  router.get('/creditupdate',async(request,response) => {
    try{
        const pcdata = await PCData.find({});

        return response.status(200).json({
            data:pcdata
        });
    }
    catch(error){
        console.log(error.message)
        return response.status(500).send({message:error.message})
    }
})
  router.post("/creditupdate",async(request,response) => {
    console.log(request.body);
    try{
        const newPCData = {
            pcname:request.body.name,
            date:request.body.date,
            amount:request.body.amount,
            addedon:request.body.currentDate
        }

        const pcdetail = await PCData.create(newPCData);

        return response.status(201).send(pcdetail)
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})
  
  
  // Middleware
  app.use(express.json());
  
  // Routes

    app.get("/creditupdate",(request,response) => {
      console.log(request);
      return response.status(134).send(JSON.stringify(response));
    })

    app.use('/creditupdate',router)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });