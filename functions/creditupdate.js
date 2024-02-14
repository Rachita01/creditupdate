// functions/getCreditUpdate.js

const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    pcname:String,
    date:String,
    amount:String,
    addedon:String
  })
 
  const PCData = mongoose.model('PCData',dataSchema);

exports.handler = async (event, context) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    if (event.httpMethod === 'GET') {
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
    } else {
        if(event.httpMethod === 'POST'){
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
        }
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
