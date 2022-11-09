let form = document.getElementById('prodForm')

form.addEventListener('submit',e=>{
    e.preventDefault();
    let formData = new FormData(form);
    
        fetch('/api/productos',{
            method: 'POST',
            body: formData,
        }).then(result => result.json).then(result => console.log(result))
})


