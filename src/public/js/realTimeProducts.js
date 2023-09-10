const socketClient = io();
const div = document.getElementById("container");



socketClient.on("prodList", prodList => {
    div.innerHTML = "";
    const virtualFragment = document.createDocumentFragment();
    for (let i = 0; i < prodList.length; i++) {
        const newDiv = document.createElement('div');
        const div = document.createElement('div');
        div.innerHTML = `<div class="card" id="card${prodList[i].id}">
            <div>
              <img src="${prodList[i].thumbnail}"  alt="${prodList[i].title}"/>
              <h3>${prodList[i].title}</h3>
              <div>
                <p>${prodList[i].description}</p>
                <p>Categoría:${prodList[i].category}</p>
                <p>Código:${prodList[i].code}</p>
                <p>Stock:${prodList[i].stock}</p>
                <p>Precio: $${prodList[i].price}</p>
              </div >
            </div >
         </div >`
        newDiv.appendChild(div);
        virtualFragment.appendChild(newDiv);
    }
    div.appendChild(virtualFragment);
})

const prodForm = document.getElementById("idForm");
prodForm.addEventListener("submit", (elements) => {
    elements.preventDefault();

    let title = prodForm.elements.title.value;
    let description = prodForm.elements.description.value;
    let stock = prodForm.elements.stock.value;
    let thumbnail = prodForm.elements.thumbnail.value;
    let category = prodForm.elements.category.value;
    let price = prodForm.elements.price.value;
    let code = prodForm.elements.code.value;



    socketClient.emit("updateProduct", {
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code,

    });
    prodForm.reset();

});


const idForm2 = document.getElementById("idForm2");
idForm2.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let deleteById = idForm2.evt.pid.value;
    socketClient.emit("deletElement",  {deleteById} );
    idForm2.reset();
})


Swal.fire({
    position: "top",
    icon: "success",
    title: "borrado",
    showConfirmButton: false,
    timer: 2000,
});
console.log('listo');


// console.log(socket);