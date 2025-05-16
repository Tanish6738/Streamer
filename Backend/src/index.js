import app from './App.js';
import connectdb from './db/index.js';
import dotenv from "dotenv"

dotenv.config({
    path : './.env'
})

connectdb()
    .then(()=>{

        app.on('error', (error)=>{
            console.error('Error starting server:', error);
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`Server listening on port ${process.env.PORT}`);
        })
    })
    .catch((error)=>{
        console.error('Error connecting to MongoDB (in db index.js file ):', error);
})
