const io = io();

io.on("sendData", (prodList) => {
    upDataProdList(prodList)

console.log("socket");
});

function upDataProdList(prodList) {

    const div = document.getElementById("prodContainer");

    let product = prodList;
    let productsList = "";
    div.innerHTML = "";
    product.forEach((product) => {
        productsList += `<div id=${product.id}>
                             <div>
                             <div>
                                  <img src=${product.thumbnail} />
                                      <p>${product.title}</p>
                                      <p>${product.category}</p>
                                      <p>${product.description}</p>
                                      <p>${product.price}</p>
                                      <p>${product.code}</p>
                                      <p>${product.stock}</p>
                              </div>
                              </div>
                          </div>`;
        div.innerHTML = product;

    });

}
const prodForm = document.getElementById("idForm");
prodForm.addEventListener("submit", (elements) => {
    elements.preventDefault();

    let title = prodForm.elements.title.value;
    let description = prodForm.elements.value.description;
    let stock = prodForm.elements.value.stock;
    let thumbnail = prodForm.elements.value.thumbnail;
    let category = prodForm.elements.value.category;
    let price = prodForm.elements.value.category;
    let code = prodForm.elements.value.code;
    
    io.emit("updateProduct", {
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
    const deleteElementId = document.getElementById('pid');
    const deleteById = parseInt(deleteElementId.value);
    io.emit("deleteById", deleteById);
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