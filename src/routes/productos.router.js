import { request, Router } from "express";
import Contenedor from "../../contenedor";
import uploader from "../services/upload.js"

const router= Router();
const contenedor = new Contenedor()

router.get('/', async (req, res) =>{
    let result=  await contenedor.leerProds();
    res.send(result)
})
router.get('/:id', async (req, res)=>{
    const id = req.params.id
    let result = await contenedor.getById(id)
    res.send(result)
})
router.post('/', uploader.single('image'), async (req, res)=>{
    let imagen= ""
    if (req.file){
        imagen= req.protocol + "://" + req.hostname + ":8080/images/" + req.file.filename
    }
    let producto= req.body;
    if ((producto.nombre && producto.precio) != ''){
        producto.imagen =imagen;
        const result= await contenedor.save(producto)
        res.send({ producto: result})
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