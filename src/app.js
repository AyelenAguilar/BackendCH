import express from 'express';

const app= express();

const server= app.listen(8080, ()=>console.log("Listening on express"))

app.get('/', (req,res)=>{
    res.send('Holisss')
})
