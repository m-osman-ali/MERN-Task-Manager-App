import express from 'express'
const app = express()
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ('./models/db.js')
import router from './routes/router.js';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || alert('PORT NOT FOUND');

app.use(cors())
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/tasks', router)


app.listen(port, ()=>{
    console.log(`Server is Runing on ${port}`);
})