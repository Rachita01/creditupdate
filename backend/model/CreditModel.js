import mongoose from 'mongoose';

const creditSchema = mongoose.Schema(
    {
        pcname:{
            type:String,
            required:true,
        },

        date:{
            type:String,
            required:true,
        },

        amount:{
            type:String,
            required:true
        },
        addedon:{
            type:String,
            required:true
        }
    },
        {
        timestamps:true
        }
    
);

export const Credit = mongoose.model('Credit',creditSchema)