import fs from 'fs'
import __dirname from './utils.js'

const infoJson= __dirname + "./productos.json";

class Contenedor{ 
    AgregarProducto= async(producto)=>{
        if(!producto.nombre || !producto.precio){
            return{
                status:"error",
                message:"Hay campos incompletos"
            };
        }try {
                if(fs.existsSync(infoJson)){
                    let data= await fs.promises.readFile(infoJson, "utf-8");
                    let productos= JSON.parse(data);
                    let id= productos.length + 1;
                    producto.id=id;
                    productos.push(producto);
                    await fs.promises.writeFile(infoJson, JSON.stringify(productos, null, 2));
                return{
                    status:"success",
                    message:"Se ha agregado un producto"
                };
            }else{
                producto.id= 1;
                await fs.promises.writeFile(
                    infoJson,
                    JSON.stringify([producto], null, 2)
                    );
                    return{
                        status:"success",
                        message:"El producto ha sido agregado"
                    };
            }
                }catch(error){
                    return{
                        status:"error",
                        message: error.message
                    };
            
            }
    };
//funcion que lee todos los productos
        leerProds= async()=>{
        try {
                if(fs.existsSync(infoJson)){
                    let data= await fs.promises.readFile(infoJson, "utf-8");
                    let productos= JSON.parse(data);
                return{
                    status:"success",
                    productos:productos,
                };
        }else{
            return{
                status:"error",
                message:"No se encontraron productos"
            };
        }
            }catch(error){
                return{
                    status:"error",
                    message: error.message,
                };
            }
        }
            
        
//lee los productos por id

getById= async(id)=>{
    if(!id){
        return{
            status:"error",
            message:"Es necesario un ID"
        };
    }
    if(fs.existsSync(infoJson)){
        let data= await fs.promises.readFile(infoJson, "utf-8");
        let productos= JSON.parse(data);
        let producto= productos.find((producto)=> producto.id == id);
        if(producto){
            return{
                status:"success",
                producto: producto,
            };
        }else{
            return{
                status:"error",
                message:"Producto no encontrado",
            };
        }
    }else{
        return{
            status:"error",
            message:"No se encontraron productos",
        };
    }
};
// eliminar un producto por id
        deleteById= async(id) =>{
            if(!id){
                return{
                    status:"error",
                    message:"Es necesario un ID"
                };
            }
            if(fs.existsSync(infoJson)){
                let data= await fs.promises.readFile(infoJson, "utf-8");
                let productos= JSON.parse(data);
                let nuevoProd= productos.filter((producto)=>producto.id != id);
                await fs.promises.writeFile(
                    infoJson,
                    JSON.stringify(nuevoProd, null, 2)
                );
                return{
                    status:"success",
                    message:"Producto eliminado correctamente",
                };
            }else{
                return{
                    status:"error",
                    message:"No se encontraron productos",
                };
            };
        };
//borrar todos los productos

deleteAll= async()=>{
    if(fs.existsSync(infoJson)){
        let data= await fs.promises.readFile(infoJson, "utf-8");
        let productos= JSON.parse(data)
        let eliminarProductos= productos=[]
        await fs.promises.writeFile(
            infoJson,
            JSON.stringify(eliminarProductos, null, 2)
        );
        return{
            status:"success",
            message:"Se eliminaron todos los productos",
        }
    }else{
        return{
            status:"error",
            message:"No se pudieron eliminar todos los productos"
        }
    }
}

deleteObj = async () => {
    try {
        if (fs.existsSync(pathToFile)) {
            let newProd = [];
            await fs.promises.writeFile(pathToFile, JSON.stringify(newProd))
            return {
                status: "success",
                Message: "Deleted all products"
            }
        } else {
            return {
                status: "Error",
                Message: "File not found"
            }
        }
    } catch (error) {
        return {
            status: "Error",
            message: error.message
        }
    }
}

updateItem = async (object, id) => {
    if (!id) {
        return {
            status: "Error",
            message: "ID is required"
        }
    }
    let products = await this.getAll()
    try {
        let arrayProducts = products.productos.map(product => {
            if (product.id == id) {
                return {
                    nombre: object.nombre ? object.nombre : product.nombre,
                    precio: object.precio ? object.precio : product.precio,
                    imagen: object.imagen ? object.imagen : product.imagen,
                    id: product.id
                }
            } else {
                return product
            }
        })
        let productUpdate = arrayProducts.find(product => product.id == id)
        if (productUpdate) {
            await fs.promises.writeFile(pathToFile, JSON.stringify(arrayProducts, null, 2))
            return {
                status: "success",
                message: "successfully upgraded product",
                productNew: productUpdate
            }
        } else {
            return {
                status: "error",
                message: "Product not found"
            }
        }
    } catch {
        return products
    }

}

}


export default Contenedor;