const Contenedor= require("./contenedor");
const contenedor= new Contenedor();

//agregamos un producto

let prod={
    nombre:"Termo acero inoxidable",
    precio:"6500",
    imagen:"https://plataforma.interfuerzas.com.ar/Panelcontenidos/Contenidos/Termo-acero-inoxidable-1-litro-waterdog-con-manija-1620854614-0-1.jpg"
};

contenedor.AgregarProducto(prod).then((res)=>{
    console.log(res);
});


//contenedor.leerProds().then((res)=>{
  // console.log(res);
//})

//contenedor.getById(4).then((res)=>{
  //  console.log(res)
//})

//contenedor.deleteById(2).then((res)=>{
 //   console.log(res)
//})

//contenedor.deleteAll().then((res)=>{
 //   console.log(res)
//})