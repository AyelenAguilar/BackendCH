import express from 'express';
import productosRouter from './routes/productos.router.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars';

const app= express();


app.use(express.static(__dirname+'/public'));
app.use(express.json());

app.engine('handlebars', handlebars.engine());       //registro hbs
app.set('views',__dirname+ '/views');                // conecto con la carpeta views
app.set('view engine', 'handlebars');   //activo el motor que registre

app.use('/', productosRouter);
app.use('/productos', productosRouter);

app.listen(8080, ()=>console.log("Listening..."))


