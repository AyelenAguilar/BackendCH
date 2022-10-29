import express from 'express';
import fs from 'fs';
import Contenedor from "../contenedor.js";

const app= express();

const server= app.listen(8080, ()=>console.log("Listening on express"))

const returnProducts = (route) => {
    if (fs.existsSync(route)) {
        let data = fs.readFileSync(route, 'utf-8')
        let productos = JSON.parse(data)
        return productos;
    } else {
        return {
            status: "Error",
            message: "No route found"
        }
    }
}

const contenedor = new Contenedor()
app.get('/agregarProducto/:idProducto', (request, response) => {              
    let productos = returnProducts('./productos.json')
    const id = request.params.idProducto
    if (productos[id]) {
        contenedor.AgregarProducto(productos[id]).then((res) => response.send(res))
    } else {
        response.send({
            status: "Error",
            Message: "No product found"
        })
    }
})
app.get('/productoRandom/:idProducto', (request, response) => {           
    let id = request.params.idProducto
    contenedor.getById(id).then((res) => response.send(res))
})
app.get('/productos', (request, response) => {                 
    contenedor.leerProds().then((res) => response.send(res))
})

app.get('/', (req,res)=>{                 
    res.send('Holisss desafio 3')
})

