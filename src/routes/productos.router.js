import { request, Router } from "express";
import Contenedor from "../../contenedor.js";
import uploader from "../services/upload.js"

const router= Router();
const contenedor = new Contenedor()

router.get('/productos', async (req, res) =>{
    let prods=  await contenedor.leerProds()
    if (prods.productos.length !=0){
        res.render('home.handlebars',{
            prods
        })
    }else{
        res.render('home.handlebars',{
            productos:{
                mensaje:"No se encontraron productos"
            }
        })
    }

})
router.get('/:id', async (req, res)=>{
    const id = req.params.id
    let result = await contenedor.getById(id)
    res.send(result)
})
router.post('/', uploader.single('imagen'), async (req, res)=>{
    let imagen= ""
    if (req.file){
        imagen= req.protocol + "://" + req.hostname + ":8080/imagen/" + req.file.filename
    }
    let producto= req.body;
    if ((producto.nombre && producto.precio) !=''){
        producto.imagen =imagen;
        const result= await contenedor.AgregarProducto(producto)
        res.send({ product: result})
    }else{
        res.send({ status:"error", message: "Hay campos incompletos"})
    }
})

router.put('/:id', async(req,res)=>{
    const id= req.params.id
    const prodBody= req.body

    let result= await contenedor.updateItem(prodBody, id)
    res.send(result)
})

router.delete('/:id', (req,res)=>{
    const id= req.params.id
    res.send(contenedor.deleteById(id))
})



export default router;