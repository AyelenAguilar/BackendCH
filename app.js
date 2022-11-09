import express from 'express';
import productosRouter from './routes/productos.router.js'
import __dirname from './utils.js'

const app= express();
app.listen(8080, ()=>console.log("Listening..."))

app.use(express.static(__dirname+'/public'));
app.use(express.json());

app.use('/api/productos', productosRouter);


