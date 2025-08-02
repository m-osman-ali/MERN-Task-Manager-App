import mongoose from "mongoose";
// import dotenv from 'dotenv';

// dotenv.config();

const db_url = process.env.DB_URL;

mongoose.connect(db_url)
            .then(()=>{
                console.log('MondoDB is Connected...');
            }).catch((err)=>{
                console.log('MongoDB Connection Failed', err)
            })
 