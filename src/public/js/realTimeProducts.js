const socketClient = io();



socketClient.on("prodList", (prodList) => {
    upDataProdList(prodList);

});


function upDataProdList(prodList) {

    const div = document.getElementById("container");

    let productos = prodList;
    let products = "";
    div.innerHTML = "";
    productos.forEach((product) => {
        // products += `<div id="card${product.id}">
        //                      <div>
        //                      <div>
        //                           <img src="${product.thumbnail}" />
        //                           <div>    
        //                           <p>${product.title}</p>
        //                               <p>${product.category}</p>
        //                               <p>${product.description}</p>
        //                               <p>${product.price}</p>
        //                               <p>${product.code}</p>
        //                               <p>${product.stock}</p>
        //                       </div>
        //                               </div>
        //                       </div>
        //                   </div>`;
       products += `<div class="card" id="card${product.id}">
                    <div class="card-body">
                      <img src="${product.thumbnail}" width="150"class="card-img-top" alt="${product.title}"/>
                      <h5 class="card-title">${product.title}</h5>
                      <div class="card-info">
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Categoría:${product.category}</p>
                        <p class="card-text">Código:${product.code}</p>
                        <p class="card-text">Stock:${product.stock}</p>
                        <p class="card-text">Precio: $${product.price}</p>
                      </div >
                    </div >
                 </div >`
        div.innerHTML = products;

    });

}
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


document.getElementById("buttonSubmitDelete").addEventListener("click", (e) => {
    const deleteElementId = document.getElementById("pid");
    const deleteById = parseInt(deleteElementId.value);
    socketClient.emit("deleteById", deleteById);
    deleteElementId.value = "";
    Swal.fire({
        position: "top",
        icon: "success",
        title: "prod delete",
        showConfirmButton: false,
        timer: 2000,
    });
    console.log('listo');

});
// console.log(socket);